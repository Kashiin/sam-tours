import strings from './de.strings.js';

const plural = (n, one, many) => (Number(n) === 1 ? one : many);

export default {
  strings,
  // Text built from numbers at runtime
  patterns: [
    [/^(\d+) из (\d+)$/, '$1 von $2'],
    [/^(\d+) (?:день|дня|дней)$/, (_, n) => `${n} ${plural(n, 'Tag', 'Tage')}`],
    [/^◷ (\d+) (?:день|дня|дней)$/, (_, n) => `◷ ${n} ${plural(n, 'Tag', 'Tage')}`],
    [
      /^(\d+) (?:день|дня|дней) \/ (\d+) (?:ночь|ночи|ночей)$/,
      (_, d, n) => `${d} ${plural(d, 'Tag', 'Tage')} / ${n} ${plural(n, 'Nacht', 'Nächte')}`,
    ],
  ],
};
