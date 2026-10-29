import Dropdown from './Dropdown'

// Donut segments as [startDeg, endDeg], 0° = 3 o'clock, clockwise.
const segments = [
  { color: 'var(--purple)', from: -142, to: 41 },
  { color: 'var(--green)', from: 41, to: 147 },
  { color: 'var(--blue)', from: 147, to: 218 },
]

const metrics = [
  { label: 'Good Review', value: '60%', progress: 71, tone: 'purple' },
  { label: 'Fast Response', value: '25%', progress: 63.5, tone: 'green' },
  { label: 'Fast Delivery', value: '15%', progress: 52, tone: 'blue' },
]

const R = 36.8
const C = 50
const point = (deg) => {
  const rad = (deg * Math.PI) / 180
  return [C + R * Math.cos(rad), C + R * Math.sin(rad)]
}
const arc = (from, to) => {
  const [x1, y1] = point(from)
  const [x2, y2] = point(to)
  const large = to - from > 180 ? 1 : 0
  return `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2}`
}

export default function Performance() {
  return (
    <section className="card performance">
      <div className="card__head">
        <h2 className="card__title">Performance</h2>
        <Dropdown />
      </div>

      <svg className="donut" width="100" height="100" viewBox="0 0 100 100">
        {segments.map((s) => (
          <path key={s.color} d={arc(s.from, s.to)} fill="none" stroke={s.color} strokeWidth="14.6" />
        ))}
        <circle cx="87" cy="24" r="10.5" fill="#fff" />
        <text x="87" y="24.5" className="donut__tag" textAnchor="middle" dominantBaseline="middle">
          60%
        </text>
        <text x="50" y="46" className="donut__value" textAnchor="middle" dominantBaseline="middle">
          80%
        </text>
        <text x="50" y="60.5" className="donut__sub" textAnchor="middle" dominantBaseline="middle">
          Score
        </text>
      </svg>

      <ul className="metrics">
        {metrics.map((m) => (
          <li key={m.label} className={`metric metric--${m.tone}`}>
            <div className="metric__row">
              <span>{m.label}</span>
              <strong>{m.value}</strong>
            </div>
            <div className="metric__track">
              <div className="metric__fill" style={{ width: `${m.progress}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
