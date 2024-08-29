import React from 'react';

// Global type declarations for React components
declare global {
  // Most common type for this project
  type Username = { username: string };
  // Just empty object
  type EmptyObj = Record<string, unknown>;
  // React fn component with children
  type FC<T = object> = React.FunctionComponent<React.PropsWithChildren<T>>;
  // Get available props from element (e.g. button, input, div, etc.)
  type ComponentProps<T> = React.ComponentProps<T>;
  // Next page props
  type PageProps<Params = EmptyObj, SearchParams = EmptyObj> = {
    params: Partial<Params>;
    searchParams: Partial<SearchParams>;
  };
}
