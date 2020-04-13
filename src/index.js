import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware,  } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer , {  } from './store/reducer';
import { createLogger } from "redux-logger";
const logger = createLogger();

// const middleWare = [ thunk ]

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose ;

// const store = createStore( 
//   rootReducer, 
//   initialState, 
//   composeEnhancers(
//     applyMiddleware( ...middleWare ),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

const store = createStore(rootReducer, applyMiddleware(thunk,logger));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
