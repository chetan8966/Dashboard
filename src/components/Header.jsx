import { SearchIcon, ChatIcon, BellIcon, CaretDown } from './Icons'
import avatar from '../assets/img/avatar.png'

export default function Header() {
  return (
    <header className="card header">
      <h1 className="header__title">Dashboard</h1>

      <label className="search">
        <SearchIcon size={22} />
        <input type="text" placeholder="Search here......." />
      </label>

      <div className="header__spacer" />

      <button className="icon-btn icon-btn--chat" aria-label="Messages">
        <ChatIcon size={23} />
      </button>
      <button className="icon-btn icon-btn--bell" aria-label="Notifications">
        <BellIcon size={18} />
        <span className="badge">5</span>
      </button>

      <button className="profile">
        <img src={avatar} alt="Moinur Rahman" />
        <span>Moinur Rahman</span>
        <CaretDown size={22} />
      </button>
    </header>
  )
}
