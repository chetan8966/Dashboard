export default function StatCard({ icon: Icon, value, label, change, tone }) {
  return (
    <div className={`card stat stat--${tone}`}>
      <button className="stat__more" aria-label="More options">
        <i />
        <i />
        <i />
      </button>
      <div className="stat__icon">
        <Icon size={20} />
      </div>
      <div className="stat__text">
        <div className="stat__value">{value}</div>
        <div className="stat__label">{label}</div>
      </div>
      <div className="stat__change">{change}</div>
    </div>
  )
}
