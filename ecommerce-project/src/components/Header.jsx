import {Link} from 'react-router-dom';
import './header.css';
export function Header({cart}) {

  let totalItems=0;

  cart.forEach((cartItem)=>{
     totalItems+=cartItem.quantity;
  })
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            Home
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link to="/orders" className="orders-link header-link">
            <span className="orders-text">Orders</span>
          </Link>

          <Link to="/checkout" className="cart-link header-link">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalItems}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
