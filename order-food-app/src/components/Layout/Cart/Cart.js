import React, {useContext, useState} from 'react'
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../../store/cart-contex";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {

    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false);

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

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        //сюда приходят данных с формы что заполнил пользователь
        const response = await fetch('https://react-essential-things-3-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    order: cartCtx.items
                })
            })
        //working with response answer from server for checking errors
        console.log(response.status)

        setIsSubmitting(false)
        setDidSubmit(true)
        //очищаем корзину
        cartCtx.emptyCart();
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


    const cartModalContent =
        <>
            {/*всегда выводится содержимое корзины и дальше смотря что нажали */}
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckingOut && modalActions}
        </>

    const isSubmittingModalContent = <p> Sending order data to server ... </p>

    const didSubmitModalContent = <>
        <p>Successfully sent the order! We will contact your soon...</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}
export default Cart
