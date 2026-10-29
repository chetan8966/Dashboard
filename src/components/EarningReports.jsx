import Dropdown from './Dropdown'
import useWidth from '../hooks/useWidth'

// Values are in $K. Blue = Total Orders, purple = Total Income.
const data = [
  { day: 'Sun', orders: 16.0, income: 27.0 },
  { day: 'Mon', orders: 22.6, income: 34.6 },
  { day: 'Tue', orders: 18.6, income: 29.6 },
  { day: 'Wed', orders: 15.4, income: 39.9, tooltip: '$4138.36' },
  { day: 'Thu', orders: 14.2, income: 31.8 },
  { day: 'Fri', orders: 14.8, income: 23.0 },
  { day: 'Sat', orders: 20.8, income: 34.3 },
]
// Horizontal position of each day group as a fraction of the plot width.
const groupPos = [0.0529, 0.207, 0.3593, 0.5134, 0.6694, 0.8163, 0.9597]

const yTicks = [50, 40, 30, 20, 10, 0]
const BASE = 245 // y of the 0 line
const PX_PER_K = 3.18
const PLOT_LEFT = 60
const PLOT_RIGHT_PAD = 13
const BAR_W = 7
const BAR_GAP = 5

const barPath = (x, top, w, bottom) => {
  const r = w / 2
  return `M${x},${bottom} V${top + r} A${r},${r} 0 0 1 ${x + w},${top + r} V${bottom} Z`
}

export default function EarningReports() {
  const [ref, width] = useWidth(631)
  const plotW = width - PLOT_LEFT - PLOT_RIGHT_PAD
  const yOf = (k) => BASE - k * PX_PER_K

  return (
    <section className="card earning" ref={ref}>
      <div className="card__head">
        <h2 className="card__title">Earning Reports</h2>
        <Dropdown />
      </div>
      <div className="legend">
        <span className="legend__item">
          <i className="legend__dot legend__dot--blue" /> Total Orders
        </span>
        <span className="legend__item">
          <i className="legend__dot legend__dot--purple" /> Total Income
        </span>
      </div>

      <svg className="chart" width={width} height={290}>
        <defs>
          <filter id="tipShadow" x="-50%" y="-80%" width="200%" height="260%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#5b4fd0" floodOpacity="0.14" />
          </filter>
        </defs>

        {yTicks.map((t) => {
          const y = yOf(t)
          return (
            <g key={t}>
              <text x={20} y={y + 1} className="axis-label" dominantBaseline="middle">
                {t === 0 ? '0' : `$${t}K`}
              </text>
              <line
                x1={PLOT_LEFT}
                x2={width - PLOT_RIGHT_PAD}
                y1={y}
                y2={y}
                stroke={t === 0 ? '#E6E6EC' : '#E8E8EE'}
                strokeDasharray={t === 0 ? undefined : '4 4'}
              />
            </g>
          )
        })}

        {data.map((d, i) => {
          const cx = PLOT_LEFT + groupPos[i] * plotW
          const blueX = cx - BAR_W - BAR_GAP / 2
          const purpleX = cx + BAR_GAP / 2
          return (
            <g key={d.day}>
              <path d={barPath(blueX, yOf(d.orders), BAR_W, BASE)} fill="var(--blue)" />
              <path d={barPath(purpleX, yOf(d.income), BAR_W, BASE)} fill="var(--purple)" />
              <text x={cx} y={270} className="axis-label" textAnchor="middle" dominantBaseline="middle">
                {d.day}
              </text>
              {d.tooltip && (
                <g>
                  <circle cx={purpleX + BAR_W / 2} cy={yOf(d.income)} r={4.2} fill="var(--purple)" />
                  <circle cx={purpleX + BAR_W / 2} cy={yOf(d.income)} r={2.4} fill="#fff" />
                  <circle cx={purpleX + BAR_W / 2} cy={yOf(d.income)} r={1.1} fill="var(--purple)" />
                  <g filter="url(#tipShadow)">
                    <rect x={purpleX + BAR_W / 2 - 39} y={66} width={78} height={29} rx={4} fill="#FBFBFE" />
                    <path
                      d={`M${purpleX + BAR_W / 2 - 5},95 L${purpleX + BAR_W / 2},100 L${purpleX + BAR_W / 2 + 5},95 Z`}
                      fill="#FBFBFE"
                    />
                  </g>
                  <text x={purpleX + BAR_W / 2} y={81} className="tooltip-text" textAnchor="middle" dominantBaseline="middle">
                    {d.tooltip}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </section>
  )
}
