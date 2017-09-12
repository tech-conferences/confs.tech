export const YEARS = ['2017', '2018'];

export const TYPES = {
  javascript: 'JavaScript',
  css: 'CSS',
  ux: 'Design / UX',
  ruby: 'Ruby',
  ios: 'iOS / Swift',
  android: 'Android',
};

const BASE_URL = 'https://raw.githubusercontent.com/tech-conferences/confs.tech/master/conferences';

export function getConferenceLink(state) {
  const {type, year} = state;
  return `${BASE_URL}/${year}/${type.toLocaleLowerCase()}.json`;
}
