import { useEffect, useState } from 'react';
import { getPersistedAccessToken } from '../service/spotify';
import { createStore } from './state';

interface SetCredentialsAction {
  type: 'set-credentials';
  accessToken: string;
  invalidationTime: number;
}
interface ResetCredentialsAction {
  type: 'reset-credentials';
}

type Action = SetCredentialsAction | ResetCredentialsAction;
type State = {
  accessToken?: string;
  invalidationTime?: number;
};

const initialState: State = {};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-credentials': {
      return {
        ...state,
        accessToken: action.accessToken,
        invalidationTime: action.invalidationTime,
      };
    }
    case 'reset-credentials': {
      return {
        ...state,
        accessToken: undefined,
        invalidationTime: undefined,
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

type LoggedIn = 'pending' | 'loggedIn' | 'notLoggedIn' | 'expireToken';

export const useLoggedInSelector = (): LoggedIn => {
  const [loggedIn, setLoggedIn] = useState<LoggedIn>('pending');
  const dispatch = store.useDispatch();
  const { accessToken, invalidationTime } = store.useState();

  useEffect(() => {
    const hasAccessTokenInStore = !!accessToken;
    if (hasAccessTokenInStore) {
      setLoggedIn('loggedIn');
    } else {
      const persistedToken = getPersistedAccessToken();
      if (persistedToken && new Date(persistedToken.expireTime) > new Date()) {
        dispatch({
          type: 'set-credentials',
          accessToken: persistedToken.accessToken,
          invalidationTime: persistedToken.expireTime,
        });
      } else {
        setLoggedIn('notLoggedIn');
      }
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (invalidationTime) {
      const duration = invalidationTime - new Date().getTime();
      if (duration > 0) {
        timeout = setTimeout(() => {
          setLoggedIn('expireToken');
        }, duration);
      } else {
        setLoggedIn('expireToken');
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [invalidationTime]);

  return loggedIn;
};
