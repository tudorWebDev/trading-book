import { HashRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './HomePage'
import WyckoffBook from './books/WyckoffBook'
import OrderFlowBook from './books/OrderFlowBook'
import SweepsBook from './books/SweepsBook'
import ReversalsBook from './books/ReversalsBook'
import ImbalancesBook from './books/ImbalancesBook'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wyckoff" element={<WyckoffBook />} />
        <Route path="/orderflow" element={<OrderFlowBook />} />
        <Route path="/sweeps" element={<SweepsBook />} />
        <Route path="/reversals" element={<ReversalsBook />} />
        <Route path="/imbalances" element={<ImbalancesBook />} />
      </Routes>
      <Analytics />
    </HashRouter>
  )
}
