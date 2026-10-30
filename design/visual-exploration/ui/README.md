# Rushta app prototype

A clickable prototype of the Rushta UI, not a picture. Open `index.html` in a browser. It blends directions A, C and E.

- **A:** the two-tone headline, the prescription card and its progress steps.
- **C:** chips, prescription cards, pharmacy list, details and pickup slots, and Arabic right to left.
- **E:** the big dashboard number, issued and collected stats, the invite card, the dispensed progress bar and the dark pill nav.

## What works

- **Patient:** home, prescriptions (Active, Past, Shared, with an empty state), prescription detail with pickup slots and reserve, a pickup code sheet, pharmacies with search and filters, profile.
- **Clinic:** dashboard, queue, new prescription form with validation, a send confirmation, and a code check sheet.
- **English and Arabic:** switch with EN and ع at the top. The layout flips to right to left.
- **View as:** switch between patient and clinic at the top. The bar at the top is for the prototype only.

Buttons: the main action is Forest. The secondary action is a light grey with a green tint and no stroke. Type is Satoshi for English and Rubik for Arabic.

All people, prescriptions and pharmacies are sample data. The QR in the code sheet is a sample pattern and will not scan. The mark on the invite card is a placeholder.

`build.py` writes `index.html` (opens from disk) and `artifact.html` (the same app with Satoshi inlined, for publishing).
