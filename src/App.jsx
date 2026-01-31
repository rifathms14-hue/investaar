import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Market from './screens/Market'
import PlotDetail from './screens/PlotDetail'
import AllocationFlow from './screens/AllocationFlow'
import Portfolio from './screens/Portfolio'
import Records from './screens/Records'
import Account from './screens/Account'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Market />} />
          <Route path="plot/:id" element={<PlotDetail />} />
          <Route path="allocation/:id" element={<AllocationFlow />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="records" element={<Records />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
