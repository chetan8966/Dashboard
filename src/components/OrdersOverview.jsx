import eksa from '../assets/img/eksa.png'
import watch from '../assets/img/watch.png'
import backpack from '../assets/img/backpack.png'

const orders = [
  { name: 'Eksa E1000', img: eksa, qty: '120 pcs', price: '$150', inStock: true },
  { name: 'Y20 Smart Watch', img: watch, qty: '150 pcs', price: '$175', inStock: false },
  { name: 'Rider45 Backpack', img: backpack, qty: '90 pcs', price: '$102', inStock: true },
]

export default function OrdersOverview() {
  return (
    <section className="card orders">
      <div className="card__head">
        <h2 className="card__title">Orders Overview</h2>
        <a href="#" className="see-all">
          See all
        </a>
      </div>

      <div className="table">
        <div className="table__head">
          <span>Product Name</span>
          <span>Quantity</span>
          <span className="col-price">Price</span>
          <span>Status</span>
        </div>
        {orders.map((o, i) => (
          <div key={o.name} className={`table__row${i === 1 ? ' table__row--active' : ''}`}>
            <span className="product">
              <img src={o.img} alt="" />
              {o.name}
            </span>
            <span>{o.qty}</span>
            <span>
              <span className="pill pill--green">{o.price}</span>
            </span>
            <span>
              <span className={`pill ${o.inStock ? 'pill--blue' : 'pill--red'}`}>
                {o.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
