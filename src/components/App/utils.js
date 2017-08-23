import { compareAsc, compareDesc } from 'date-fns';

export function sortByDate(items, direction) {
  const compFunc = direction === 'asc' ? compareAsc : compareDesc;

  return Array.from(items).sort((itemA, itemB) => {
    return compFunc(itemA.startDate, itemB.startDate);
  });
}
