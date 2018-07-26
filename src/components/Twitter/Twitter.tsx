import React from 'react';

export default class Twitter extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(script);
  }

  render() {
    return (
      <>
        <a
          href="https://twitter.com/ConfsTech"
          className="twitter-follow-button"
          data-show-count="false"
        >
          Follow @ConfsTech
        </a>
      </>
    );
  }
}
