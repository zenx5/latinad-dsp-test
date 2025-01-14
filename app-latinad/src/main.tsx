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
import { ROUTES } from './tools/constants.ts';
import Checkout from './views/Checkout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path={ROUTES.HOME} element={<Main />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
