import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import EarningReports from './components/EarningReports'
import Performance from './components/Performance'
import UserAnalysis from './components/UserAnalysis'
import OrdersOverview from './components/OrdersOverview'
import { EyeIcon, IdCardIcon, CartIcon, ExchangeIcon } from './components/Icons'

const stats = [
  { icon: EyeIcon, value: '$95,139', label: 'Total Income', change: '+20%', tone: 'purple' },
  { icon: IdCardIcon, value: '$74,589', label: 'Total Expence', change: '+15%', tone: 'blue' },
  { icon: CartIcon, value: '$98,374', label: 'Total Orders', change: '+30%', tone: 'green' },
  { icon: ExchangeIcon, value: '$6,983', label: 'Total Bonus', change: '+05%', tone: 'red' },
]

export default function App() {
  const [active, setActive] = useState('Dashboard')

  return (
    <div className="app">
      <Sidebar active={active} onSelect={setActive} />
      <main className="main">
        <Header />
        <div className="stats">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
        <div className="row row--top">
          <EarningReports />
          <Performance />
        </div>
        <div className="row row--bottom">
          <UserAnalysis />
          <OrdersOverview />
        </div>
      </main>
    </div>
  )
}
