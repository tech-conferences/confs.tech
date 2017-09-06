export const YEARS = ['2017', '2018'];

export const TYPES = {
  javascript: 'JavaScript',
  ux: 'Design / UX',
  ruby: 'Ruby',
  ios: 'iOS / Swift',
};

const BASE_URL = 'https://raw.githubusercontent.com/nimzco/confs.tech/master/conferences';

export function getConferenceLink(state) {
  const {type, year} = state;
  return `${BASE_URL}/${year}/${type.toLocaleLowerCase()}.json`;
}
