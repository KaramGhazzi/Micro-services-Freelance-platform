export default function numberFormat(number: number, locale = 'nl-NL') {
  if (!number) {
    return;
  }

  return number.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
