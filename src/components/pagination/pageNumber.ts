export function getPageNumbers(current: number, total: number): (number | '...')[] {
  const delta = 2;
  const range: (number | '...')[] = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || 
      i === total || 
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (
      range[range.length - 1] !== '...'
    ) {
      range.push('...');
    }
  }

  return range;
}
