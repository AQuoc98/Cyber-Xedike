import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const middleware = [thunk];


const store = createStore(
    rootReducer,
    compose( // compose all store enhancers from right to left
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // use for redux dev tool
    )
);


export default store;

