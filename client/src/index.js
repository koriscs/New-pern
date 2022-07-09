import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
);

