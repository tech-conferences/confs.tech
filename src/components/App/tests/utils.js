export function getDuplicates(conferences) {
  const confURLs = conferences.map((conf) => conf.url);
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
