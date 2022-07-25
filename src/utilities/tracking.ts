type eventType = 'outbound-sponsored' | 'outbound-sponsored-footer' | 'outbound'

export const trackLink = (eventType: eventType) => {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { href } = event.currentTarget

    ga('send', 'event', eventType, 'click', href, {
      transport: 'beacon',
    })
  }
}
