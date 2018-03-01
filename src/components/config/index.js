export const CURRENT_YEAR = (new Date()).getFullYear() - 1;

export const APPLICATION_ID = '8MN5N7L4M3';
export const API_KEY = 'fc9ac0af9e5feec3531031b37d239cbc';
export const ALGOLIA_INDEX_NAME = 'conferences';

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

export function getAddConferenceUrl(type) {
  return `${REPO_URLS[type.toLocaleLowerCase()]}/issues/new`;
}
