

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import App from './App.jsx';
import './index.css';
import { store, persistor } from '../src/redux/store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}> 
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
