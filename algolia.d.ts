declare module 'react-instantsearch/connectors' {
  import * as React from 'react'

  interface Connector {
    (component: any): any
  }

  export const connectConfigure: Connector
  export const connectCurrentRefinements: Connector
  export const connectHierarchicalMenu: Connector
  export const connectHighlight: Connector
  export const connectHits: Connector
  export const connectAutoComplete: Connector
  export const connectHitsPerPage: Connector
  export const connectInfiniteHits: Connector
  export const connectMenu: Connector
  export const connectNumericMenu: Connector
  export const connectPagination: Connector
  export const connectPoweredBy: Connector
  export const connectRange: Connector
  export const connectRefinementList: Connector
  export const connectScrollTo: Connector
  export const connectBreadcrumb: Connector
  export const connectSearchBox: Connector
  export const connectSortBy: Connector
  export const connectStats: Connector
  export const connectToggleRefinement: Connector
  export const connectStateResults: Connector
}

declare module 'react-instantsearch/dom' {
  import * as React from 'react'

  export const InstantSearch: any
  export const Index: any
  export const Configure: any
  export const CurrentRefinements: any
  export const HierarchicalMenu: any
  export const Highlight: any
  export const Snippet: any
  export const Hits: any
  export const HitsPerPage: any
  export const InfiniteHits: any
  export const Menu: any
  export const MenuSelect: any
  export const NumericMenu: any
  export const Pagination: any
  export const PoweredBy: any
  export const RangeInput: any
  export const RangeSlider: any
  export const RatingMenu: any
  export const RefinementList: any
  export const ClearRefinements: any
  export const ScrollTo: any
  export const SearchBox: any
  export const SortBy: any
  export const Stats: any
  export const ToggleRefinement: any
  export const Panel: any
  export const Breadcrumb: any
}

declare module 'react-instantsearch/native' {
  import * as React from 'react'

  export const InstantSearch: React.Component
  export const Index: React.Component
  export const Configure: React.Component
}

declare module 'react-instantsearch/server' {
  import * as React from 'react'

  export type resultsState = Object | any[]

  export interface root {
    Root: string | ((...args: any[]) => any)
    props?: Object
  }

  export interface props {
    algoliaClient?: Object
    appId?: string
    apiKey?: string
    children?: React.ReactNode[] | React.ReactNode
    indexName: string
    createURL?: (...args: any[]) => any
    searchState?: Object
    refresh: boolean
    onSearchStateChange?: (...args: any[]) => any
    onSearchParameters?: (...args: any[]) => any
    resultsState?: resultsState
    root?: root
  }

  type CreateInstantSearch = React.SFC<props>
}
