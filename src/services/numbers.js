export default function toFormattedNumber(number, roundPrecision = null, units = false) {
  let value = number;
  let precision = roundPrecision;
  const commaSeparator = ['en-US', 'en-GB', 'ro-RO', 'zh-TW'];
  let locale = document.querySelector('#cookiebanner').getAttribute('data-locale');
  if (commaSeparator.includes(locale)) {
    locale = 'en-US';
  } else {
    locale = 'de-DE';
  }
  if (Number.isNaN(value) || value === undefined || value == null) return undefined;

  if (units) {
    let neg = false;
    if (value < 0) {
      neg = true;
      value *= -1;
    }

    const abbrev = [
      '',
      // eslint-disable-next-line no-undef
      LocalizationStrings.unitKilo,
      // eslint-disable-next-line no-undef
      LocalizationStrings.unitMega,
      document.querySelector('#cookiebanner').getAttribute('data-locale').substring(0, 2) === 'fr'
        ? 'G'
      // eslint-disable-next-line no-undef
        : LocalizationStrings.unitMilliard,
      'T',
    ];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(value)) / 3);
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
    const suffix = abbrev[order];

    if (precision == null) {
      const significantDigits = 3;
      const maxPrecision = String(value / 10 ** (order * 3)).split('.')[1]
        ? String(value / 10 ** (order * 3)).split('.')[1].length
        : 0;
      const prevPrecision = Math.max(significantDigits - String(value / 10 ** (order * 3)).split('.')[0].length);
      for (let p = Math.min(maxPrecision, prevPrecision); p > 0; p -= 1) {
        if (
          (value / 10 ** (order * 3))
            .toLocaleString(locale, {
              minimumFractionDigits: p,
              maximumFractionDigits: p,
            })
            .slice(-1) !== '0'
        ) {
          precision = p;
          break;
        }
      }
    }
    const isArray = Array.isArray(precision);

    return (
      (neg ? '-' : '')
            + (value / 10 ** (order * 3)).toLocaleString(locale, {
              minimumFractionDigits: (isArray && precision[0] != null) ? precision[0] : precision,
              maximumFractionDigits: (isArray && precision[1] != null) ? precision[1] : precision,
            })
            + suffix
    );
  }
  return value.toLocaleString(locale, {
    minimumFractionDigits: precision || 0,
    maximumFractionDigits: precision || 2,
  });
}
