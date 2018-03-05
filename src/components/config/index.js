export const CURRENT_YEAR = (new Date()).getFullYear() - 1;

export const TOPICS = {
  javascript: 'JavaScript',
  css: 'CSS',
  ux: 'Design / UX',
  ruby: 'Ruby',
  ios: 'iOS / Swift',
  android: 'Android',
  php: 'PHP',
  'tech-comm': 'Technical communication',
  general: 'General',
};

const DEFAULT_REPO_URL = 'https://github.com/tech-conferences/confs.tech';

const REPO_URLS = {
  javascript: 'https://github.com/tech-conferences/javascript-conferences',
  css: DEFAULT_REPO_URL,
  php: DEFAULT_REPO_URL,
  ux: DEFAULT_REPO_URL,
  ruby: DEFAULT_REPO_URL,
  ios: DEFAULT_REPO_URL,
  android: DEFAULT_REPO_URL,
  'tech-comm': DEFAULT_REPO_URL,
  general: DEFAULT_REPO_URL,
};

export function getAddConferenceUrl(topic = 'JavaScript') {
  return `${REPO_URLS[topic.toLocaleLowerCase()]}/issues/new`;
}
