# The open-source and crowd sourced conference website

Confs.tech is an open source project that lists upcoming tech conferences. Everything is free and will stay free. It's aimed to be simple and without useless clutter. You can filter by topics and [see upcoming CFPs](https://confs.tech/cfp).

- [The open-source and crowd sourced conference website](#the-open-source-and-crowd-sourced-conference-website)
  - [Contributing](#contributing)
  - [Adding a conference](#adding-a-conference)
  - [Maintainers](#maintainers)
  - [Top 10 Contributors](#top-10-contributors)
  - [Related projects](#related-projects)
  - [Call for papers](#call-for-papers)
  - [Conferences by category](#conferences-by-category)
  - [License](#license)

## Contributing

Contributing to the website is as simple as running:

```sh
npm install
npm run start
```

Environment variables are defined in the .env files and are accessible on the repo since they are public.

## Adding a conference

All conferences are stored in [JSON files](https://github.com/tech-conferences/conference-data/tree/master/conferences), sorted by topics and years. All data is open source and crowd sourced by the community. Whether added directly [from the website](https://confs.tech/conferences/new) by conference organizers or through pull requests.

Conference data have the following structure:

```json
{
  "name": "",
  "url": "",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "city": "",
  "country": "",
  "cfpUrl": "",
  "cfpEndDate": "",
  "twitter": "",
  "mastodon": ""
}
```

## Maintainers

Need help while contributing? Tag any of the maintainers when creating the issue. You can tag us using: `@username`

<table>
    <tr>
        <td align="center" width="200">
            <pre><a href="https://github.com/cgrail"><img src="https://avatars.githubusercontent.com/u/5702278?size=200" width="200" alt="GitHub Profile picture of Christian Grail" /><br><sub>Christian Grail</sub></a><br>@cgrail</pre>
        </td>
        <td align="center" width="200">
            <pre><a href="https://github.com/nimzco"><img src="https://avatars.githubusercontent.com/u/445045?size=200" width="200" alt="GitHub Profile picture of Nima Izadi" /><br><sub>Nima Izadi</sub></a><br>@nimzco</pre>
        </td>
        <td align="center" width="200">
            <pre><a href="https://github.com/prigara"><img src="https://avatars.githubusercontent.com/u/782562?size=200" width="200" alt="GitHub Profile picture of Ekaterina Prigara" /><br><sub>Ekaterina Prigara</sub></a><br>@prigara</pre>
        </td>
        <td align="center" width="200">
            <pre><a href="https://github.com/trivikr"><img src="https://avatars.githubusercontent.com/u/16024985?size=200" width="200" alt="GitHub Profile picture of Trivikram Kamat" /><br><sub>Trivikram Kamat</sub></a><br>@trivikr</pre>
        </td>
    </tr>
</table>

## Top 10 Contributors

<a href="https://github.com/tech-conferences/confs.tech/graphs/contributors"><img src="https://contrib.rocks/image?max=10&repo=tech-conferences/confs.tech" /></a>

## Related projects

Some of the conferences have been pulled from other projects:

- Ruby conferences: [ruby-conferences/ruby-conferences.github.io](https://github.com/ruby-conferences/ruby-conferences.github.io)
- Android: [AndroidStudyGroup/conferences](https://github.com/AndroidStudyGroup/conferences)
- iOS: [Lascorbe/CocoaConferences](https://github.com/Lascorbe/CocoaConferences)

## Call for papers

- [See all open call for papers](https://confs.tech/cfp)

## Conferences by category

[![General](https://img.shields.io/badge/General-2E8B57.svg?style=for-the-badge)](https://confs.tech/general)
[![.net](https://img.shields.io/badge/.NET-512BD4.svg?style=for-the-badge&logo=.NET&logoColor=white)](https://confs.tech/dotnet)
[![Accessbility](https://img.shields.io/badge/Accessbility-000000.svg?style=for-the-badge)](https://confs.tech/accessbility)
[![Android](https://img.shields.io/badge/Android-3DDC84.svg?style=for-the-badge&logo=Android&logoColor=white)](https://confs.tech/android)
[![APIs](https://img.shields.io/badge/APIs-6B8E23.svg?style=for-the-badge)](https://confs.tech/api)
[![Clojure](https://img.shields.io/badge/Clojure-5881D8.svg?style=for-the-badge&logo=Clojure&logoColor=white)](https://confs.tech/clojure)
[![CSS](https://img.shields.io/badge/CSS-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)](https://confs.tech/css)
[![Data](https://img.shields.io/badge/Data-FF4500.svg?style=for-the-badge)](https://confs.tech/data)
[![Design / UX](https://img.shields.io/badge/Design%20/%20UX-1E90FF.svg?style=for-the-badge)](https://confs.tech/ux)
[![Dev Ops](https://img.shields.io/badge/Dev%20Ops-FFD700.svg?style=for-the-badge)](https://confs.tech/devops)
[![Elixir](https://img.shields.io/badge/Elixir-4B275F.svg?style=for-the-badge&logo=Elixir&logoColor=white)](https://confs.tech/elixir)
[![Elm](https://img.shields.io/badge/Elm-60B5CC.svg?style=for-the-badge&logo=Elm&logoColor=white)](https://confs.tech/elm)
[![Golang](https://img.shields.io/badge/Golang-00ADD8.svg?style=for-the-badge&logo=Go&logoColor=white)](https://confs.tech/golang)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&logoColor=white)](https://confs.tech/graphql)
[![Groovy](https://img.shields.io/badge/Groovy-4298B8.svg?style=for-the-badge&logo=Apache%20Groovy&logoColor=white)](https://confs.tech/groovy)
[![Haskell](https://img.shields.io/badge/Haskell-5D4F85.svg?style=for-the-badge&logo=Haskell&logoColor=white)](https://confs.tech/haskell)
[![Identity](https://img.shields.io/badge/Identity-4B0082.svg?style=for-the-badge)](https://confs.tech/identity)
[![iOS](https://img.shields.io/badge/iOS-000000.svg?style=for-the-badge&logo=Apple&logoColor=white)](https://confs.tech/ios)
[![IoT](https://img.shields.io/badge/IoT-7CFC00.svg?style=for-the-badge)](https://confs.tech/iot)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)](https://confs.tech/javascript)
[![Leadership](https://img.shields.io/badge/Leadership-4B0082.svg?style=for-the-badge)](https://confs.tech/leadership)
[![Open Source](https://img.shields.io/badge/Open%20Source-3DA639.svg?style=for-the-badge)](https://confs.tech/opensource)
[![Performance](https://img.shields.io/badge/Performance-00FF7F.svg?style=for-the-badge)](https://confs.tech/performance)
[![PHP](https://img.shields.io/badge/PHP-777BB4.svg?style=for-the-badge&logo=PHP&logoColor=white)](https://confs.tech/php)
[![Product](https://img.shields.io/badge/Product-DC143C.svg?style=for-the-badge)](https://confs.tech/product)
[![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)](https://confs.tech/python)
[![Ruby](https://img.shields.io/badge/Ruby-CC342D.svg?style=for-the-badge&logo=Ruby&logoColor=white)](https://confs.tech/ruby)
[![Rust](https://img.shields.io/badge/Rust-000000.svg?style=for-the-badge&logo=Rust&logoColor=white)](https://confs.tech/rust)
[![Scala](https://img.shields.io/badge/Scala-DC322F.svg?style=for-the-badge&logo=Scala&logoColor=white)](https://confs.tech/scala)
[![Security](https://img.shields.io/badge/Security-9ACD32.svg?style=for-the-badge)](https://confs.tech/security)
[![Technical communication](https://img.shields.io/badge/Technical%20communication-D2691E.svg?style=for-the-badge)](https://confs.tech/tech-comm)
[![Testing](https://img.shields.io/badge/Testing-40E0D0.svg?style=for-the-badge)](https://confs.tech/testing)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)](https://confs.tech/typescript)

## License

[MIT](LICENSE.md)
