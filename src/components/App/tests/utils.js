export function getDuplicates(conferences) {
  const confUUIDs = conferences.map((conf) => `${conf.url}-${conf.city}`);
  const duplicates = [];

  Object.keys(conferences).forEach((key, index) => {
    const url = conferences[key].url;
    if (confUUIDs.indexOf(url, index + 1) !== -1) {
      if (duplicates.indexOf(url) === -1) {
        duplicates.push(conferences[key]);
      }
    }
  });
  return duplicates;
}
