import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import './index.css'
import Main from './views/Main.tsx';
import Layout from './views/Layout.tsx';
import './translates/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<span>cart</span>} />
          <Route path="/checkout" element={<span>checkout</span>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
