'use client'

import { Provider } from 'react-redux'
import { useRef } from 'react';
import { AppStore, makeStore } from './store';

export default function StoreProvider ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }
    return (
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    );
}