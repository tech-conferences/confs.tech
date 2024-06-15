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
  twitter_username?: string;
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  contributions: number;
}
