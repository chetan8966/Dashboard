import {
  LogoMark,
  DashboardIcon,
  AnalysisIcon,
  ReportIcon,
  ProductIcon,
  EarningIcon,
  SettingsIcon,
  HelpIcon,
  CaretDown,
} from './Icons'

const mainNav = [
  { label: 'Dashboard', icon: DashboardIcon },
  { label: 'Analysis', icon: AnalysisIcon },
  { label: 'Report', icon: ReportIcon },
  { label: 'Product', icon: ProductIcon },
  { label: 'Earning', icon: EarningIcon },
]

const systemNav = [
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Help Center', icon: HelpIcon },
]

function NavItem({ label, icon: Icon, active, onClick }) {
  return (
    <li>
      <button className={`nav-item${active ? ' active' : ''}`} onClick={onClick}>
        <Icon size={22} />
        <span>{label}</span>
      </button>
    </li>
  )
}

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <LogoMark />
        <span>Alignfolio</span>
      </div>

      <h4 className="side-heading side-heading--main">Main Navigation</h4>
      <ul className="nav-list">
        {mainNav.map((item) => (
          <NavItem key={item.label} {...item} active={active === item.label} onClick={() => onSelect(item.label)} />
        ))}
      </ul>

      <h4 className="side-heading side-heading--system">System</h4>
      <ul className="nav-list">
        {systemNav.map((item) => (
          <NavItem key={item.label} {...item} active={active === item.label} onClick={() => onSelect(item.label)} />
        ))}
      </ul>

      <h4 className="side-heading side-heading--download">Download Report</h4>
      <button className="report-select">
        <span>Weekly Report</span>
        <CaretDown size={22} />
      </button>
    </aside>
  )
}
