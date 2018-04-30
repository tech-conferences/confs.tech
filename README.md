# The open-source and crowd sourced conference website

Confs.tech is an open source project that lists upcoming tech conferences. Everything is free and will stay free. It's aimed to be simple and without useless clutter. You can filter by topics and [see upcoming CFPs](https://confs.tech/cfp).

## Adding a conference

All conferences are stored in [JSON files](https://github.com/tech-conferences/confs.tech/tree/master/conferences), sorted by topics and years. All data is open source and crowd sourced by the community. Whether added directly [from the website](https://confs.tech/conferences/new) by conference organizers or through pull requests.

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


Currently, the JavaScript conferences are stored on the [javascript-conferences repo](https://github.com/tech-conferences/javascript-conferences) for legacy reasons (this might change in the future).

## Active contributors

- [Nima Izadi](https://nimz.co)
- [Ekaterina Prigara](https://twitter.com/katyaprigara)
- [Trivikram Kamat](https://twitter.com/trivikram)

If you want to contribute, the project is React based (it's an ejected create-react-app), so running:

```
$ npm install
$ npm run start
```

Should do the trick!


## Related projects

Some of the conferences have been pulled from other projects:

- Ruby conferences: [ruby-conferences/ruby-conferences.github.io](https://github.com/ruby-conferences/ruby-conferences.github.io)
- Android: [AndroidStudyGroup/conferences](https://github.com/AndroidStudyGroup/conferences)
- iOS: [Lascorbe/CocoaConferences](https://github.com/Lascorbe/CocoaConferences)
- UX: [CSS Tricks conference guide](https://css-tricks.com/guide-2017-conferences)

## License

[MIT](LICENSE.md)

## Links

- [See all JavaScript conferences](https://confs.tech/javascript)
- [See all CSS conferences](https://confs.tech/css)
- [See all PHP conferences](https://confs.tech/php)
- [See all Design / UX conferences](https://confs.tech/ux)
- [See all Ruby conferences](https://confs.tech/ruby)
- [See all iOS conferences](https://confs.tech/ios)
- [See all Technical communication conferences](https://confs.tech/tech-comm)
- [See all Data conferences](https://confs.tech/data)
- [See all Dev Ops conferences](https://confs.tech/devops)
- [See all Android conferences](https://confs.tech/android)
- [See all Python conferences](https://confs.tech/python)
- [See all Golang conferences](https://confs.tech/golang)
- [See all Rust conferences](https://confs.tech/rust)
- [See all Elixir conferences](https://confs.tech/elixir)
- [See all Security conferences](https://confs.tech/security)
- [See all Scala conferences](https://confs.tech/scala)
- [See general conferences](https://confs.tech/general)

