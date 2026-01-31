import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Market from './screens/Market'
import PlotDetail from './screens/PlotDetail'
import AllocationFlow from './screens/AllocationFlow'
import Portfolio from './screens/Portfolio'
import Records from './screens/Records'
import Account from './screens/Account'
import Terms from './screens/Terms'
import PreBookingCampaigns from './screens/prebooking/PreBookingCampaigns'
import AllocationPoolOverview from './screens/prebooking/AllocationPoolOverview'
import AllocationRequest from './screens/prebooking/AllocationRequest'
import PreBookingPayment from './screens/prebooking/PreBookingPayment'
import PreBookingConfirmed from './screens/prebooking/PreBookingConfirmed'
import ActiveRegions from './screens/regions/ActiveRegions'
import AreaList from './screens/regions/AreaList'
import AllocationSize from './screens/regions/AllocationSize'
import PlotList from './screens/regions/PlotList'
import RegionPlots from './screens/regions/RegionPlots'
import EMIDashboard from './screens/portfolio/EMIDashboard'
import StarFrameCustomize from './screens/starframe/StarFrameCustomize'
import StarFrameDelivery from './screens/starframe/StarFrameDelivery'
import StarFrameComplete from './screens/starframe/StarFrameComplete'
import OnboardingFlow from './screens/onboarding/OnboardingFlow'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding Flow - Outside Layout */}
        <Route path="/onboarding/*" element={<OnboardingFlow />} />
        
        {/* Main App - Inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Market />} />
          <Route path="pre-booking" element={<PreBookingCampaigns />} />
          <Route path="pre-booking/:campaignId/pool" element={<AllocationPoolOverview />} />
          <Route path="pre-booking/:campaignId/request" element={<AllocationRequest />} />
          <Route path="pre-booking/:campaignId/confirm" element={<PreBookingPayment />} />
          <Route path="pre-booking/:campaignId/success" element={<PreBookingConfirmed />} />
          <Route path="regions" element={<ActiveRegions />} />
          <Route path="regions/:regionId/plots" element={<RegionPlots />} />
          <Route path="regions/:regionId" element={<AreaList />} />
          <Route path="regions/:regionId/areas/:areaId" element={<AllocationSize />} />
          <Route path="regions/:regionId/areas/:areaId/plots" element={<PlotList />} />
          <Route path="regions/:regionId/areas/:areaId/plot/:plotId" element={<PlotDetail />} />
          <Route path="plot/:id" element={<PlotDetail />} />
          <Route path="purchase/:id" element={<AllocationFlow />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/emi/:plotId" element={<EMIDashboard />} />
          <Route path="star-frame/:plotId" element={<StarFrameCustomize />} />
          <Route path="star-frame/:plotId/delivery" element={<StarFrameDelivery />} />
          <Route path="star-frame/:plotId/complete" element={<StarFrameComplete />} />
          <Route path="records" element={<Records />} />
          <Route path="records/:plotId" element={<Records />} />
          <Route path="account" element={<Account />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
