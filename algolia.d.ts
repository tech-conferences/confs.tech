declare module 'react-instantsearch/connectors' {
  import * as React from 'react';

  interface Connector {
    (component: typeof React.Component): React.Component;
  }

  export const connectConfigure: Connector;
  export const connectCurrentRefinements: Connector;
  export const connectHierarchicalMenu: Connector;
  export const connectHighlight: Connector;
  export const connectHits: Connector;
  export const connectAutoComplete: Connector;
  export const connectHitsPerPage: Connector;
  export const connectInfiniteHits: Connector;
  export const connectMenu: Connector;
  export const connectNumericMenu: Connector;
  export const connectPagination: Connector;
  export const connectPoweredBy: Connector;
  export const connectRange: Connector;
  export const connectRefinementList: Connector;
  export const connectScrollTo: Connector;
  export const connectBreadcrumb: Connector;
  export const connectSearchBox: Connector;
  export const connectSortBy: Connector;
  export const connectStats: Connector;
  export const connectToggleRefinement: Connector;
  export const connectStateResults: Connector;
}

declare module 'react-instantsearch/dom' {
  import * as React from 'react';

  export const InstantSearch: React.Component;
  export const Index: React.Component;
  export const Configure: React.Component;
  export const CurrentRefinements: React.Component;
  export const HierarchicalMenu: React.Component;
  export const Highlight: React.Component;
  export const Snippet: React.Component;
  export const Hits: React.Component;
  export const HitsPerPage: React.Component;
  export const InfiniteHits: React.Component;
  export const Menu: React.Component;
  export const MenuSelect: React.Component;
  export const NumericMenu: React.Component;
  export const Pagination: React.Component;
  export const PoweredBy: React.Component;
  export const RangeInput: React.Component;
  export const RangeSlider: React.Component;
  export const RatingMenu: React.Component;
  export const RefinementList: React.Component;
  export const ClearRefinements: React.Component;
  export const ScrollTo: React.Component;
  export const SearchBox: React.Component;
  export const SortBy: React.Component;
  export const Stats: React.Component;
  export const ToggleRefinement: React.Component;
  export const Panel: React.Component;
  export const Breadcrumb: React.Component;
}

declare module 'react-instantsearch/native' {
  import * as React from 'react';

  export const InstantSearch: React.Component;
  export const Index: React.Component;
  export const Configure: React.Component;
}

declare module 'react-instantsearch/server' {
  import * as React from 'react';

  export type resultsState = Object | any[];

  export interface root {
    Root: string | ((...args: any[]) => any);
    props?: Object;
  }

  export interface props {
    algoliaClient?: Object;
    appId?: string;
    apiKey?: string;
    children?: React.ReactNode[] | React.ReactNode;
    indexName: string;
    createURL?: (...args: any[]) => any;
    searchState?: Object;
    refresh: boolean;
    onSearchStateChange?: (...args: any[]) => any;
    onSearchParameters?: (...args: any[]) => any;
    resultsState?: resultsState;
    root?: root;
  }

  type CreateInstantSearch = React.SFC<props>;
}
