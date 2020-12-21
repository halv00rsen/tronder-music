import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface StoreProps<State, Action> {
  initialState: State;
  name: string;
  reducer: (state: State, action: Action) => State;
}

interface ProviderProps {
  children: ReactNode;
}

interface Store<State, Dispatch> {
  provider: (props: ProviderProps) => JSX.Element;
  useState: () => State;
  useDispatch: () => Dispatch;
}

export const createStore = <State, Action>({
  initialState,
  reducer,
  name,
}: StoreProps<State, Action>): Store<State, (action: Action) => void> => {
  type Dispatch = (action: Action) => void;

  const StateContext = createContext<State | undefined>(undefined);
  const DispatchContext = createContext<Dispatch | undefined>(undefined);

  const StateProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useState = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
      throw new Error(`useState for ${name} requires a provider.`);
    }
    return context;
  };

  const useDispatch = () => {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      throw new Error(`useDispatch for ${name} requires a provider`);
    }
    return context;
  };

  return {
    provider: StateProvider,
    useDispatch,
    useState,
  };
};
