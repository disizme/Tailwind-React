import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import allReducers from './reducers/state';

const middleware = applyMiddleware(reduxThunk);

export default createStore(allReducers, middleware);




