import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from 'src/redux/rootReducers'
import thunk from 'redux-thunk'
import { UserState } from './reducers/user'
import { SystemState } from './reducers/system'

export interface StoreState {
  user: UserState
  system: SystemState
}
const makeStore: MakeStore<Store.RootState> = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  return store
}

export const wrapper = createWrapper<Store.RootState>(makeStore)
