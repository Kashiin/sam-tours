import strings from './uz.strings.js';

export default {
  strings,
  // Text built from numbers at runtime
  patterns: [
    [/^(\d+) из (\d+)$/, '$2 tadan $1 tasi'],
    [/^(\d+) (?:день|дня|дней)$/, '$1 kun'],
    [/^◷ (\d+) (?:день|дня|дней)$/, '◷ $1 kun'],
    [/^(\d+) (?:день|дня|дней) \/ (\d+) (?:ночь|ночи|ночей)$/, '$1 kun / $2 tun'],
  ],
};
