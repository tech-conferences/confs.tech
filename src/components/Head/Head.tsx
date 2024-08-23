import { Helmet } from 'react-helmet'
import { useDarkModeContext } from 'src/contexts/DarkModeContext'

const CURRENT_YEAR = new Date().getFullYear()
const Head = () => {
  const {
    values: { darkModeEnabled },
  } = useDarkModeContext()

  const faviconUrl = darkModeEnabled ? '/favicon-dark.png' : '/favicon.png'

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Find your next tech conference: JavaScript, UX / Design, DevOps, Android, iOS, PHP, Ruby, Python etc"
        />
        <title>
          Find your next tech conference | JavaScript, UX, Ruby and more
        </title>
        <link
          href="https://fonts.googleapis.com/css?family=Merriweather|Lato"
          rel="stylesheet"
        />

        <meta content="/logo.png" property="og:image" />
        <meta
          content="Confs.tech | List of tech conferences: JavaScript, UX / Design, Ruby"
          property="og:site_name"
        />
        <meta content="website" property="og:type" />
        <meta content="Confs.tech" property="og:title" />
        <meta content="https://confs.tech" property="og:url" />
        <meta
          content="Find your next tech conference: JavaScript, UX / Design, DevOps, Android, iOS, PHP, Ruby, Python etc"
          property="og:description"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ConfsTech" />
        <meta name="twitter:creator" content="@nimz_co" />
        <meta
          name="twitter:title"
          content={`Confs.tech | All tech conferences in ${CURRENT_YEAR} and ${
            CURRENT_YEAR + 1
          }`}
        />
        <meta
          name="twitter:description"
          content="Find your next tech conference: JavaScript, UX / Design, DevOps, Android, iOS, PHP, Ruby, Python etc"
        />
        <meta name="twitter:image" content="/logo.png" />
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FBVEHTPVZC"
        ></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FBVEHTPVZC');
          `}
        </script>
        <link rel="icon" type="image/png" href={faviconUrl} />
      </Helmet>
    </>
  )
}

export default Head
