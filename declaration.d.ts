interface Conference {
  objectID: string;
  name: string;
  topics: string[];
  url: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  twitter: string;
  cfpEndDate: string;
  cfpUrl: string;
  affiliateText: string;
  affiliateUrl: string;
  latitude: number;
  longitude: number;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module 'react-favicon' {
  export default React.Component;
}
