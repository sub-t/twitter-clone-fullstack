const lookup = [
  { value: 0, symbol: '' },
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
];

export const formatNumber = (num: number) => {
  const { value, symbol } = lookup
    .slice()
    .filter(({ value }) => value <= num)
    .pop()!;
  return value > 0 ? Math.round(num / value) + symbol : num.toString();
};
