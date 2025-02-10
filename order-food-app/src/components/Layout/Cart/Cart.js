import React, {useContext, useState} from 'react'
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {

    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const cartCtx = useContext(CartContext);
    // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    //управляем появлением финального заказа по кнопке order!
    const orderHandler = () => {
        setIsCheckingOut(true)

    }

    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} //bind for future execution
                onAdd={cartItemAddHandler.bind(null, item)}
            />

        ))}
    </ul>)


    //вот так можно выносить куски кода в данном случае кнопки в корзине
    const modalActions =
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems &&
                <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>


    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onCancel={props.onClose}/>}

            {!isCheckingOut && modalActions}

        </Modal>
    )
}
export default Cart
