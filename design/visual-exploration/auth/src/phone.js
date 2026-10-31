// Saudi mobile numbers: nine digits, the first one is 5.
export function normalizePhone(input) {
  let d = String(input ?? '').replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 0x660)).replace(/\D/g, '');
  if (d.startsWith('00966')) d = d.slice(5);
  else if (d.startsWith('966')) d = d.slice(3);
  if (d.startsWith('05')) d = d.slice(1);
  return d;
}

export function isValidPhone(national) {
  return /^5\d{8}$/.test(national);
}

// 5X XXX XXXX, filled from the left as the user types.
export function formatNational(national) {
  const d = national.slice(0, 9);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 9)].filter(Boolean).join(' ');
}

export function maskPhone(national) {
  return `+966 ${national.slice(0, 2)} ••• ••${national.slice(-2)}`;
}
