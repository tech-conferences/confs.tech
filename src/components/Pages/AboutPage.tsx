import React from 'react';
import Structure from './Structure';
import Link from '../Link';
import Twitter from '../Twitter';

export default function SponsorPage() {
  return (
    <Structure title="About Confs.tech">
      <p>
        At Confs.tech, we maintain a list of conferences on software development going on around the world. We want to make it easier for everyone to find relevant conferences.
      </p>
      <p>
        All the data about the conferences is available on{' '}
        <Link external url="https://github.com/tech-conferences/conference-data">GitHub</Link>{' '}
        and anyone can submit a new event using
        <Link routed url="/conferences/new">the form</Link>{' '}
        or by
        <Link url="https://github.com/tech-conferences/conference-data">sending a pull request.</Link>{' '}
        Confs.tech is a non-profit initiative and we don’t charge for adding a conference to the list.
      </p>
      <p>
        If you have any partnership ideas, <Link url="mailto:contact@confs.tech">email us.</Link>
      </p>
      <p>
        With ❤️ –{' '}
        <Twitter handle='katyaprigara' />,{' '}
        <Twitter handle='nimz_co' /> and{' '}
        <Twitter handle='trivikram' />
      </p>
    </Structure>
  )
}
