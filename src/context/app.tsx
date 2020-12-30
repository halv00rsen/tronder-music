import { useEffect, useState } from 'react';
import { getPersistedAccessToken } from '../service/spotify';
import { createStore } from './state';

interface SetCredentialsAction {
  type: 'set-credentials';
  accessToken: string;
}
interface ResetCredentialsAction {
  type: 'reset-credentials';
}

type Action = SetCredentialsAction | ResetCredentialsAction;
type State = {
  accessToken?: string;
};

const initialState: State = {};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-credentials': {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case 'reset-credentials': {
      return {
        ...state,
        accessToken: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
const store = createStore<State, Action>({
  initialState,
  name: 'app',
  reducer,
});

export const AppStateProvider = store.provider;

export const useAppState = store.useState;

export const useAppDispatch = store.useDispatch;

type LoggedIn = 'pending' | 'loggedIn' | 'notLoggedIn';

export const useLoggedInSelector = (): LoggedIn => {
  const [loggedIn, setLoggedIn] = useState<LoggedIn>('pending');
  const dispatch = store.useDispatch();
  const state = store.useState();

  useEffect(() => {
    const hasAccessTokenInStore = !!state.accessToken;
    if (hasAccessTokenInStore) {
      setLoggedIn('loggedIn');
    } else {
      const persistedToken = getPersistedAccessToken();
      if (persistedToken && new Date(persistedToken.expireTime) > new Date()) {
        dispatch({
          type: 'set-credentials',
          accessToken: persistedToken.accessToken,
        });
      } else {
        setLoggedIn('notLoggedIn');
      }
    }
  }, [state.accessToken, dispatch]);

  return loggedIn;
};
