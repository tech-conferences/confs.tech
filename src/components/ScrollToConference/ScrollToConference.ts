import { Component } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'

interface Props {
  hash: string
  hits?: { [key: string]: string }[]
}

interface State {
  scrolled: boolean
}

class ScrollToConference extends Component<Props, State> {
  state = {
    scrolled: false,
  }

  componentDidUpdate() {
    const { hash, hits } = this.props
    const { scrolled } = this.state
    if (scrolled || (hits && hits.length === 0)) {
      return
    }

    this.setState({ scrolled: true }, () => {
      setTimeout(() => {
        location.hash = ''
        location.hash = hash
      })
    })
  }

  render() {
    return null
  }
}

export default connectInfiniteHits(ScrollToConference)
