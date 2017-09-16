# Confs.tech | Yet another conference website

List of conferences pulled out from [JSON files](https://github.com/tech-conferences/confs.tech/tree/master/conferences).
- [See all JavaScript conferences in 2017](https://confs.tech/2017/javascript)
- [See all CSS conferences in 2017](https://confs.tech/2017/css)
- [See all Design / UX conferences in 2017](https://confs.tech/2017/ux)
- [See all Ruby conferences in 2017](https://confs.tech/2017/ruby)
- [See all iOS conferences in 2017](https://confs.tech/2017/ios)
- [See all Android conferences in 2017](https://confs.tech/2017/android)

Don't hesitate to add new conferences by [creating an issue](https://github.com/tech-conferences/confs.tech/issues/new) or creating a pull request. 🤓

## Adding a conference

Conferences are JSON based files. They have the following structure:

```json
  {
    "name": "",
    "url": "",
    "startDate": "2018-08-17",
    "endDate": "2018-08-19",
    "city": "",
    "country": "",
    "cfpUrl": "",
    "cfpEndDate": "",
    "twitter": "",
  }
```

Dates are formatted like `YYYY-MM-DD`, and if the date has not been defined yet, you can use this format as well: `YYYY-MM`.

- To add JavaScript conferences, create a Pull Request on the [javascript-conferences repo](https://github.com/tech-conferences/javascript-conferences).
- For all other conferences, create a Pull Request on this repo.


## Active contributors
- [Nima Izadi](https://nimz.co)
- [Ekaterina Prigara](https://twitter.com/katyaprigara)

Because together we are stronger, we are looking for other contributors. So hit us and let's contribute!

## Credits
Most of the conferences are originally pulled from other repo:
- Ruby: [ruby-conferences/ruby-conferences.github.io](https://github.com/ruby-conferences/ruby-conferences.github.io)
- Android: [AndroidStudyGroup/conferences](https://github.com/AndroidStudyGroup/conferences)
- iOS: [Lascorbe/CocoaConferences](https://github.com/Lascorbe/CocoaConferences)
- UX: [CSS Tricks conference guide](https://css-tricks.com/guide-2017-conferences)

## License

[MIT](LICENSE.md)
