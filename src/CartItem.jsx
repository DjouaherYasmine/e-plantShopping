import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
  return cart.reduce((total, item) => {
    const cost = parseFloat(item.cost.replace('$', '')) || 0; // Ensure cost is a number
    return total + cost * item.quantity;
  }, 0).toFixed(2); // Return as a string with 2 decimal places
};

  const handleContinueShopping = (e) => {
    onContinueShopping(e); 
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    item.quantity += 1;
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    if(item.quantity>1){
        item.quantity-=1;
    }
    else{
        dispatch(removeItem(item.name));
    }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
   
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Ensure `item.cost` is a number
    const cost = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
    
    // Ensure `item.quantity` is a number
    const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity, 10) : item.quantity;

    // Calculate total cost
    const total = cost * quantity;
    
    return total;
};

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e)=> handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


