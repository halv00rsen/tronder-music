import { createStore } from './state';

interface State {
  en: string;
}

interface Action {
  type: 'digg';
  en: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'digg': {
      return {
        ...state,
        en: action.en,
      };
    }
    default: {
      return state;
    }
  }
};

const store = createStore<State, Action>({
  initialState: { en: 'eneeee' },
  name: 'testing state',
  reducer,
});

export const TestProvider = store.provider;
export const useTestState = store.useState;
export const useTestDispatch = store.useDispatch;
