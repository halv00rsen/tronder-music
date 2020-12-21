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

export const useLoggedInSelector = (): boolean => {
  const state = store.useState();
  return !!state.accessToken;
};
