import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyInvoice from '../pages/myInvoice/myInvoice'
import Home from './../pages/home/home'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/myInvoice" element={<MyInvoice />} />
        <Route path="/" element={<Home />} />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
