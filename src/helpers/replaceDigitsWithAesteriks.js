export function replacePhoneNumbers(z) {
  const w = z.toString();
  if (w.length < 3) return w;
  return w.substring(0, 2) + '*'.repeat(w.length - 4) + w.substring(11, 13);
}
