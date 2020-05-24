import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';
import './App.css'

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
