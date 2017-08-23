import { compareAsc, compareDesc } from 'date-fns';

export function sortByDate(items, direction) {
  const compFunc = direction === 'asc' ? compareAsc : compareDesc;

  return Array.from(items).sort((itemA, itemB) => {
    return compFunc(itemA.startDate, itemB.startDate);
  });
}

function getDuplicates(conferences) {
  const confURLs = conferences.map(conf => conf.url);
  const duplicates = [];

  Object.keys(conferences).forEach((key, index) => {
    const url = conferences[key].url;
    if (confURLs.indexOf(url, index + 1) !== -1) {
      if (duplicates.indexOf(url) === -1) {
        duplicates.push(conferences[key]);
      }
    }
  });
  return duplicates;
}

showDuplicates = conferences => {
  return (
    <ul>
      <li>
        <strong>DUPLICATES</strong>
      </li>
      {getDuplicates(conferences).map(conf =>
        <li>
          {conf.name}: {conf.url}
        </li>
      )}
    </ul>
  );
};
