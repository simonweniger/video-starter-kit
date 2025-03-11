// Type declarations for Convex
declare module 'convex/react' {
  import type { ReactNode } from 'react';
  
  // Define the client as a function type
  export type ConvexReactClient = (url: string) => ConvexReactClient;
  
  export interface ConvexProviderProps {
    client: ConvexReactClient;
    children: ReactNode;
  }
  
  export function ConvexProvider(props: ConvexProviderProps): JSX.Element;
  export function useMutation<T, A, R = unknown>(mutation: T): (args: A) => Promise<R>;
  export function useQuery<T, A, R = unknown>(query: T, args: A | 'skip'): R | undefined;
}
