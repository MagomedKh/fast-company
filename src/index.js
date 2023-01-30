import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.css'
import { createStore } from './app/store/createStore';
import { Provider } from 'react-redux';
import navigateUtil, { CustomRouter } from './app/utils/navigateUtil';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter navigateUtil={navigateUtil}>
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>
);

