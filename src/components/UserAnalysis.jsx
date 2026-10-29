import Dropdown from './Dropdown'
import useWidth from '../hooks/useWidth'

const PLOT_LEFT = 48
const PLOT_RIGHT_PAD = 21
const REF_PLOT_W = 395 // plot width the points below were measured at
const TOP = 60 // y of the "10" line
const STEP = 24.3 // px between 2-unit grid lines

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dayX = [25.5, 83.75, 142, 200.25, 258.5, 316.75, 375] // x within the plot

// [x within the plot, value 0–10]
const purple = [
  [0.5, 4.75], [25.5, 5.16], [64.5, 5.82], [84.5, 5.58], [107, 5.08], [122, 5.08], [147, 4.88],
  [204.5, 6.98], [242, 5.66], [248, 5.04], [265.5, 4.55], [292, 3.93], [307, 4.34], [329.5, 5.45],
  [375, 5.86], [394.5, 6.19],
]
const blue = [
  [0.5, 2.88], [25.5, 3.5], [52, 4.65], [64.5, 4.53], [84.5, 3.79], [99.5, 3.09], [114.5, 3.29],
  [144.5, 4.4], [167, 4.61], [184.5, 4.4], [197, 4.94], [204.5, 5.22], [214.5, 4.73], [229.5, 3.5],
  [244.5, 3.21], [262, 3.62], [292, 4.73], [312, 4.4], [334.5, 4.12], [357, 3.7], [375, 4.12], [394.5, 4.44],
]

// Catmull-Rom spline -> cubic Bézier path.
function smooth(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`
  }
  return d
}

export default function UserAnalysis() {
  const [ref, width] = useWidth(464)
  const plotW = width - PLOT_LEFT - PLOT_RIGHT_PAD
  const sx = (x) => PLOT_LEFT + (x / REF_PLOT_W) * plotW
  const sy = (v) => TOP + (10 - v) * (STEP / 2)
  const toPts = (series) => series.map(([x, v]) => [sx(x), sy(v)])
  const wedX = sx(204.5)

  return (
    <section className="card analysis" ref={ref}>
      <div className="card__head">
        <h2 className="card__title">User Analysis</h2>
        <Dropdown />
      </div>

      <svg className="chart" width={width} height={222}>
        <defs>
          <filter id="glowPurple" x="-5%" y="-30%" width="110%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#6022EA" floodOpacity="0.16" />
          </filter>
          <filter id="glowBlue" x="-5%" y="-30%" width="110%" height="180%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#36ACF0" floodOpacity="0.2" />
          </filter>
        </defs>

        {[10, 8, 6, 4, 2, 0].map((v) => (
          <g key={v}>
            <text x={20} y={sy(v) + 1} className="axis-label" dominantBaseline="middle">
              {v}
            </text>
            <line x1={PLOT_LEFT} x2={width - PLOT_RIGHT_PAD} y1={sy(v)} y2={sy(v)} stroke="#EDEDF1" />
          </g>
        ))}

        <line x1={wedX} x2={wedX} y1={sy(5.22)} y2={sy(0)} stroke="#C8CAD6" strokeDasharray="2 2" />

        <path d={smooth(toPts(blue))} fill="none" stroke="var(--blue)" strokeWidth="1.8" filter="url(#glowBlue)" />
        <path d={smooth(toPts(purple))} fill="none" stroke="var(--purple)" strokeWidth="1.8" filter="url(#glowPurple)" />

        <circle cx={wedX} cy={sy(6.98)} r="2.6" fill="var(--purple)" stroke="#fff" strokeWidth="1.2" />
        <circle cx={wedX} cy={sy(5.22)} r="2.6" fill="var(--blue)" stroke="#fff" strokeWidth="1.2" />

        {days.map((d, i) => (
          <text key={d} x={sx(dayX[i])} y={206} className="axis-label" textAnchor="middle" dominantBaseline="middle">
            {d}
          </text>
        ))}
      </svg>
    </section>
  )
}
