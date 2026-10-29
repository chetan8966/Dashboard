import { CaretDown } from './Icons'

export default function Dropdown({ value = 'This Week' }) {
  return (
    <button className="dropdown">
      <span>{value}</span>
      <CaretDown size={20} />
    </button>
  )
}
