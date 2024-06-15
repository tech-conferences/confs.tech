export const maintainersData = [
  { login: "nimz_co", name: "Nima Izadi" },
  { login: "cgrail", name: "Cyril Grail" },
  { login: "prigara", name: "Ekaterina Prigara" },
  { login: "trivikr", name: "Trivikram Kamat" },
  { login: "JuanPabloDiaz", name: "Juan Diaz" },
];

export interface MaintainersDataInterface {
  name: string;
  avatarUrl: string;
  designation: string;
  role: string;
  firstLink: string;
  firstTxt: string;
  secondLink: string;
  secondTxt: string;
  thirdLink: string;
  thirdTxt: string;
  fourthLink: string;
  fourthTxt: string;
}

export const Maintainers: MaintainersDataInterface[] = [
  {
    name: "Nima Izadi",
    avatarUrl: "https://avatars.githubusercontent.com/u/445045?v=4",
    designation: "Engineer Manager",
    role: "Founder",
    firstLink: "https://github.com/nimzco",
    firstTxt: "GitHub",
    secondLink: "https://www.linkedin.com/in/nimzco/",
    secondTxt: "LinkedIn",
    thirdLink: "https://x.com/nimz_co",
    thirdTxt: "Twitter",
    fourthLink: "https://nimz.co/",
    fourthTxt: "Website",
  },
  {
    name: "Christian Grail",
    avatarUrl: "https://avatars.githubusercontent.com/u/5702278?v=4",
    designation: "Software Developer",
    role: "Core Maintainer",
    firstLink: "https://github.com/cgrail",
    firstTxt: "GitHub",
    secondLink: "https://www.linkedin.com/in/cgrail/",
    secondTxt: "LinkedIn",
    thirdLink: "https://x.com/cgrail",
    thirdTxt: "Twitter",
    fourthLink: "https://grails.de/about/",
    fourthTxt: "Website",
  },
  {
    name: "Ekaterina Prigara",
    avatarUrl: "https://avatars.githubusercontent.com/u/782562?v=4",
    designation: "Product Manager",
    role: "Maintainer",
    firstLink: "https://github.com/prigara",
    firstTxt: "GitHub",
    secondLink: "https://www.linkedin.com/in/prigara/",
    secondTxt: "LinkedIn",
    thirdLink: "https://x.com/katyaprigara",
    thirdTxt: "Twitter",
    fourthLink: "",
    fourthTxt: "Need_URL",
  },
  {
    name: "Trivikram Kamat",
    avatarUrl: "https://avatars.githubusercontent.com/u/16024985?v=4",
    designation: "Software Development",
    role: "Maintainer",
    firstLink: "https://github.com/trivikr",
    firstTxt: "GitHub",
    secondLink: "https://www.linkedin.com/in/trivikramkamat/",
    secondTxt: "LinkedIn",
    thirdLink: "https://x.com/trivikram",
    thirdTxt: "Twitter",
    fourthLink: "https://fosstodon.org/@trivikram",
    fourthTxt: "Mastodon",
  },
  {
    name: "Juan Diaz",
    avatarUrl: "https://avatars.githubusercontent.com/u/25883220?v=4",
    designation: "Frontend Developer",
    role: "Maintainer",
    firstLink: "https://github.com/JuanPabloDiaz",
    firstTxt: "GitHub",
    secondLink: "https://www.linkedin.com/in/1diazdev/",
    secondTxt: "LinkedIn",
    thirdLink: "https://x.com/1diazdev",
    thirdTxt: "Twitter",
    fourthLink: "https://jpdiaz.dev/",
    fourthTxt: "Website",
  },
];

export interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
  twitter_username?: string;
  id: number;
  name?: string;
}

export const dummyContributors: Contributor[] = [
  {
    id: 1,
    avatar_url: "https://avatars.githubusercontent.com/u/25883220?v=4",
    name: "Juan Diaz",
    login: "juanpablodiaz",
    contributions: 200,
  },
  {
    id: 2,
    avatar_url: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "John Doe",
    login: "johndoe",
    contributions: 15,
  },
  {
    id: 3,
    avatar_url: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "jane mith",
    login: "janesmith",
    contributions: 10,
  },
  {
    id: 4,
    avatar_url: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Bob Smith Johnson",
    login: "bobjohnson",
    contributions: 5,
  },
  {
    id: 5,
    avatar_url: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Bob Johnson",
    login: "bobjohnson",
    contributions: 18,
  },
  {
    id: 6,
    avatar_url: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "one two three",
    login: "bobjohnson",
    contributions: 34,
  },
  {
    id: 7,
    avatar_url: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "capital letter name",
    login: "bobjohnson",
    contributions: 12,
  },
  {
    id: 8,
    avatar_url: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Bob Johnson",
    login: "bobjohnson",
    contributions: 6,
  },
  {
    id: 9,
    avatar_url: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Ella Young",
    login: "bobjohnson",
    contributions: 5,
  },
  {
    id: 10,
    avatar_url: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Eli Vasquez",
    login: "bobjohnson",
    contributions: 25,
  },
  {
    id: 11,
    avatar_url: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Bob Johnson",
    login: "bobjohnson",
    contributions: 50,
  },
  {
    id: 12,
    avatar_url: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Bob Johnson",
    login: "bobjohnson",
    contributions: 17,
  },
];
