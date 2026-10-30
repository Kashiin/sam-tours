import strings from './en.strings.js';

const plural = (n, one, many) => (Number(n) === 1 ? one : many);

export default {
  strings,
  // Text built from numbers at runtime
  patterns: [
    [/^(\d+) из (\d+)$/, '$1 of $2'],
    [/^(\d+) (?:день|дня|дней)$/, (_, n) => `${n} ${plural(n, 'day', 'days')}`],
    [/^◷ (\d+) (?:день|дня|дней)$/, (_, n) => `◷ ${n} ${plural(n, 'day', 'days')}`],
    [
      /^(\d+) (?:день|дня|дней) \/ (\d+) (?:ночь|ночи|ночей)$/,
      (_, d, n) => `${d} ${plural(d, 'day', 'days')} / ${n} ${plural(n, 'night', 'nights')}`,
    ],
  ],
};
