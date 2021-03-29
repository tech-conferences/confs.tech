import { Twitter, Link, Page } from 'src/components'

export default function SponsorPage() {
  return (
    <Page
      narrow
      title='About Confs.tech'
      htmlTitle='About Confs.tech open source project and team'
      backButton
    >
      <p>
        Confs.tech is a list of conferences on software development going on
        around the world. We want to make it easier for everyone to find
        relevant conferences.
      </p>
      <p>
        All the data about the conferences is available on{' '}
        <Link
          external
          url='https://github.com/tech-conferences/conference-data'
        >
          GitHub
        </Link>{' '}
        and anyone can submit a new event using{' '}
        <Link routed url='/conferences/new'>
          the form
        </Link>{' '}
        or by
        <Link url='https://github.com/tech-conferences/conference-data'>
          sending a pull request.
        </Link>{' '}
        Confs.tech is a non-profit initiative and we don’t charge for adding a
        conference to the list.
      </p>
      <p>
        If you want to help us with the website or want to give discounts to
        Confs.tech visitors,{' '}
        <Link url='mailto:contact@confs.tech'>email us.</Link>
      </p>
      <p>
        With{' '}
        <span role='img' aria-label='heart'>
          ❤️
        </span>{' '}
        – <Twitter handle='cgrail' /> · <Twitter handle='katyaprigara' /> ·{' '}
        <Twitter handle='nimz_co' />
      </p>
    </Page>
  )
}
