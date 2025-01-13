import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from 'react-redux';

import './index.css'
import Main from './views/Main/Main.tsx';
import Cart from './views/Cart/Cart.tsx';
import Layout from './views/Layout.tsx';
import './translates/i18n'
import { persistor, store } from './tools/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<span>checkout</span>} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
