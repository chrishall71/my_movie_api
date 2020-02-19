import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Impoort statement to indicated that you need to bundle ./index.scss
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
// eslint-disable-next-line react/prefer-stateless-function
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of you app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
