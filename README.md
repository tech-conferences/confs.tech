# The open-source and crowd sourced conference website

Confs.tech is an open source project that lists upcoming tech conferences. Everything is free and will stay free. It's aimed to be simple and without useless clutter. You can filter by topics and [see upcoming CFPs](https://confs.tech/cfp).

- [The open-source and crowd sourced conference website](#the-open-source-and-crowd-sourced-conference-website)
  - [Contributing](#contributing)
  - [Adding a conference](#adding-a-conference)
  - [Active contributors](#active-contributors)
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
  "twitter": ""
}
```

## Active contributors

- [Christian Grail](https://twitter.com/cgrail)
- [Ekaterina Prigara](https://twitter.com/katyaprigara)
- [Nima Izadi](https://nimz.co)
- [Trivikram Kamat](https://twitter.com/trivikram)


## Related projects

Some of the conferences have been pulled from other projects:

- Ruby conferences: [ruby-conferences/ruby-conferences.github.io](https://github.com/ruby-conferences/ruby-conferences.github.io)
- Android: [AndroidStudyGroup/conferences](https://github.com/AndroidStudyGroup/conferences)
- iOS: [Lascorbe/CocoaConferences](https://github.com/Lascorbe/CocoaConferences)

## Call for papers
- [See all open call for papers](https://confs.tech/cfp)

## Conferences by category

- [See all .NET conferences](https://confs.tech/dotnet)
- [See all Android conferences](https://confs.tech/android)
- [See all Clojure conferences](https://confs.tech/clojure)
- [See all ColdFusion Markup Language conferences](https://confs.tech/cfml)
- [See all Content strategy conferences](https://confs.tech/tech-comm)
- [See all CSS conferences](https://confs.tech/css)
- [See all Data conferences](https://confs.tech/data)
- [See all Design / UX conferences](https://confs.tech/ux)
- [See all DevOps conferences](https://confs.tech/devops)
- [See all Elixir conferences](https://confs.tech/elixir)
- [See all elm conferences](https://confs.tech/elm)
- [See all Golang conferences](https://confs.tech/golang)
- [See all GraphQL conferences](https://confs.tech/graphql)
- [See all Groovy conferences](https://confs.tech/groovy)
- [See all iOS conferences](https://confs.tech/ios)
- [See all IoT conferences](https://confs.tech/iot)
- [See all Java conferences](https://confs.tech/java)
- [See all JavaScript conferences](https://confs.tech/javascript)
- [See all Kotlin conferences](https://confs.tech/kotlin)
- [See all Leadership conferences](https://confs.tech/product)
- [See all networking events](https://confs.tech/networking)
- [See all PHP conferences](https://confs.tech/php)
- [See all Product conferences](https://confs.tech/product)
- [See all Python conferences](https://confs.tech/python)
- [See all Ruby conferences](https://confs.tech/ruby)
- [See all Rust conferences](https://confs.tech/rust)
- [See all Scala conferences](https://confs.tech/scala)
- [See all Security conferences](https://confs.tech/security)
- [See all Testing conferences](https://confs.tech/testing)
- [See all TypeScript conferences](https://confs.tech/typescript)
- [See general conferences](https://confs.tech/general)

## License

[MIT](LICENSE.md)
