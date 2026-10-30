"""Four Rushta mark concepts built from circles, rhombi and parallel offsets. Units are arbitrary; y points down."""
import math
from shapely.geometry import Polygon, Point, LineString, box, MultiPolygon
from shapely.ops import unary_union
from shapely import affinity

PHI = (1 + 5 ** 0.5) / 2
RES = 64


def circle(c, r):
    return Point(c).buffer(r, quad_segs=RES)


def diamond(c, a, b=None):
    b = a if b is None else b
    return Polygon([(c[0], c[1] - b), (c[0] + a, c[1]), (c[0], c[1] + b), (c[0] - a, c[1])])


# A. nuqta: five pen-cut dots, one at the centre and four around it
def nuqta():
    a, g = 10.0, 2.0                      # half diagonal, channel
    s = 2 * a + g                          # centre to centre along an axis (tip to tip plus channel)
    # diamonds touch tip to tip along the axes, so the channel is measured along the axis
    c = (0, 0)
    parts = {"mid": [diamond(c, a)], "dark": [diamond((s, 0), a), diamond((-s, 0), a), diamond((0, s), a), diamond((0, -s), a)]}
    return parts


# B. block R whose counter is the Arabic reh
def shared_leg():
    stem, bowlh, rc = 28.0, 62.0, 31.0
    r = unary_union([box(0, 0, stem, 100), box(0, 0, 56, bowlh), circle((56, rc), rc),
                     Polygon([(stem, bowlh - 4), (68, bowlh - 4), (100, 100), (62, 100)])])
    cx, cy, ri, ro = 38.0, 32.0, 9.0, 22.0
    reh = circle((cx, cy), ro).difference(circle((cx, cy), ri)).intersection(box(cx, cy, cx + ro, cy + ro))
    reh = unary_union([reh, box(cx + ri, cy - 17, cx + ro, cy)])
    g = 4.0
    body = r.difference(reh.buffer(g, join_style=2)) if False else r.difference(reh.buffer(g))
    return {"dark": [body], "mid": [reh]}


# C. pen-cut ring: four arcs split by slanted cuts, one dot in the middle
def pen_ring():
    R, ri = 50.0, 50.0 / PHI
    ring = circle((0, 0), R).difference(circle((0, 0), ri))
    g, th = 5.0, math.radians(40)
    rm = (R + ri) / 2
    cuts = []
    for k in range(4):
        al = k * math.pi / 2
        p = (rm * math.cos(al), rm * math.sin(al))
        d = (math.cos(al + th), math.sin(al + th))
        L = LineString([(p[0] - d[0] * 17, p[1] - d[1] * 17), (p[0] + d[0] * 17, p[1] + d[1] * 17)]).buffer(g / 2, cap_style=2)
        cuts.append(L)
    arcs = ring.difference(unary_union(cuts))
    parts = [p for p in (arcs.geoms if hasattr(arcs, "geoms") else [arcs]) if p.area > 5]
    return {"dark": parts, "mid": [diamond((0, 0), 9.0)]}


# D. kufic contour tile: a square cut by three parallel right-angled meander lines
def offset_path(pts, d, r):
    """Right-angled polyline pts offset by d (left of travel positive, y down) with corner radius r on the centreline."""
    n = len(pts)
    dirs = []
    for i in range(n - 1):
        dx, dy = pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]
        L = math.hypot(dx, dy); dirs.append((dx / L, dy / L))
    # offset corner vertices by mitring, then round them with radius r +/- |d|
    out = []
    for i in range(n):
        if i == 0:
            nx, ny = -dirs[0][1], dirs[0][0]; out.append(((pts[0][0] + nx * d, pts[0][1] + ny * d), None)); continue
        if i == n - 1:
            nx, ny = -dirs[-1][1], dirs[-1][0]; out.append(((pts[-1][0] + nx * d, pts[-1][1] + ny * d), None)); continue
        a, b = dirs[i - 1], dirs[i]
        na, nb = (-a[1], a[0]), (-b[1], b[0])
        # vertex of the two offset lines
        px, py = pts[i][0] + na[0] * d, pts[i][1] + na[1] * d
        qx, qy = pts[i][0] + nb[0] * d, pts[i][1] + nb[1] * d
        # intersection: a is axis-aligned, b perpendicular
        if abs(a[0]) > 0.5: vx, vy = qx, py
        else: vx, vy = px, qy
        inner = ((vx - pts[i][0]) * (b[0] - a[0]) + (vy - pts[i][1]) * (b[1] - a[1])) > 0
        out.append(((vx, vy), r - abs(d) if inner else r + abs(d)))
    # build rounded polyline
    res = [out[0][0]]
    for i in range(1, n - 1):
        (vx, vy), rr = out[i]
        a, b = dirs[i - 1], dirs[i]
        p0 = (vx - a[0] * rr, vy - a[1] * rr); p1 = (vx + b[0] * rr, vy + b[1] * rr)
        cx, cy = p0[0] + b[0] * rr, p0[1] + b[1] * rr
        a0 = math.atan2(p0[1] - cy, p0[0] - cx); a1 = math.atan2(p1[1] - cy, p1[0] - cx)
        dd = (a1 - a0 + math.pi) % (2 * math.pi) - math.pi
        for k in range(RES + 1):
            t = a0 + dd * k / RES
            res.append((cx + rr * math.cos(t), cy + rr * math.sin(t)))
    res.append(out[-1][0])
    return res


def kufic_tile():
    S, s, g, r = 100.0, 7.5, 3.0, 9.0
    tile = box(0, 0, S, S)
    path = [(-20, 68), (40, 68), (40, 34), (120, 34)]
    lines = [LineString(offset_path(path, d, r)) for d in (-s, 0, s)]
    cuts = [l.buffer(g / 2, cap_style=2) for l in lines]
    bands = tile.difference(unary_union(cuts))
    ps = sorted([p for p in bands.geoms if p.area > 20], key=lambda p: p.centroid.y)
    rr = S / PHI ** 4
    ps = [p.intersection(tile.buffer(-rr).buffer(rr)) for p in ps]   # round the tile corners
    return {"dark": ps[:3], "mid": ps[3:]}, ps


CONCEPTS = {"nuqta": nuqta, "sharedleg": shared_leg, "penring": pen_ring, "kufic": lambda: kufic_tile()[0]}


def to_cmds(poly, tol=0.02):
    cmds = []
    polys = list(poly.geoms) if hasattr(poly, "geoms") else [poly]
    for p in polys:
        p = p.simplify(tol)
        for ring in [p.exterior] + list(p.interiors):
            c = list(ring.coords)[:-1]
            cmds.append(("M", [c[0]]))
            for q in c[1:]:
                cmds.append(("L", [q]))
            cmds.append(("Z", []))
    return cmds


def layers(name):
    parts = CONCEPTS[name]()
    col = [(k, to_cmds(g)) for k in ("dark", "mid", "light") for g in parts.get(k, [])]
    mono = [("sil", c) for _, c in col]
    return col, mono


# E. twin: a geometric Latin r and the Arabic reh are the same letter turned 180 degrees
def twin():
    S, Ro, t, stem, arm = 100.0, 46.0, 24.0, 72.0, 72.0
    ring = circle((Ro, Ro), Ro).difference(circle((Ro, Ro), Ro - t)).intersection(box(0, 0, Ro, Ro))
    st = Polygon([(0, Ro), (t, Ro), (t, stem - t), (0, stem)])
    ar = Polygon([(Ro, 0), (arm, 0), (arm - t, t), (Ro, t)])
    A = unary_union([ring, st, ar])
    B = affinity.rotate(A, 180, origin=(S / 2, S / 2))
    return {"dark": [A], "mid": [B]}


CONCEPTS["twin"] = twin
