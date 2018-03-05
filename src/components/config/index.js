export const CURRENT_YEAR = (new Date()).getFullYear() - 1;

export const TOPICS = {
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

export function getAddConferenceUrl(topic = 'JavaScript') {
  return `${REPO_URLS[topic.toLocaleLowerCase()]}/issues/new`;
}
