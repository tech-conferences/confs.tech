import { SearchBox } from 'react-instantsearch-dom'

import styles from './Search.module.scss'

export default function Search() {
  return (
    <div className={styles.Search}>
      <SearchBox
        translations={{
          submitTitle: 'Submit your search query.',
          resetTitle: 'Clear your search query.',
          placeholder: 'Find conferences by name or location',
        }}
      />
    </div>
  )
}
