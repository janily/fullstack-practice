import { Effect, Reducer, Subscription, request } from 'umi';

export interface ItemModelState {
  name: string;
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };

  subscriptions: { setup: Subscription };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    name: 'item',
    items: [],
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield request('/web201605/js/item.json');
      yield put({
        type: 'save',
        payload: {
          items: data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/item') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default ItemModel;
