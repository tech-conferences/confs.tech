export const CURRENT_YEAR = (new Date()).getFullYear() - 1;

export const TYPES = {
  javascript: 'JavaScript',
  css: 'CSS',
  ux: 'Design / UX',
  ruby: 'Ruby',
  ios: 'iOS / Swift',
  android: 'Android',
  php: 'PHP',
  general: 'General',
};

const DEFAULT_URL = 'https://raw.githubusercontent.com/tech-conferences/confs.tech/master/conferences';

const REPO_URLS = {
  javascript: 'https://github.com/tech-conferences/javascript-conferences',
  css: 'https://github.com/tech-conferences/confs.tech',
  php: 'https://github.com/tech-conferences/confs.tech',
  ux: 'https://github.com/tech-conferences/confs.tech',
  ruby: 'https://github.com/tech-conferences/confs.tech',
  ios: 'https://github.com/tech-conferences/confs.tech',
  android: 'https://github.com/tech-conferences/confs.tech',
  general: 'https://github.com/tech-conferences/confs.tech',
};

const RAW_CONTENT_URLS = {
  javascript: 'https://raw.githubusercontent.com/tech-conferences/javascript-conferences/master/conferences',
  css: DEFAULT_URL,
  php: DEFAULT_URL,
  ux: DEFAULT_URL,
  ruby: DEFAULT_URL,
  ios: DEFAULT_URL,
  android: DEFAULT_URL,
  general: DEFAULT_URL,
};

export function getConferenceUrl(state) {
  const {type, year} = state;
  const _type = type.toLocaleLowerCase();

  return `${RAW_CONTENT_URLS[_type]}/${year}/${_type}.json`;
}

export function getAddConferenceUrl(type) {
  return `${REPO_URLS[type.toLocaleLowerCase()]}/issues/new`;
}
