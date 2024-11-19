import React, {useContext} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../../store/cart-contex";


const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);

    //reduce working with array and provide 1 value in the end
    // 1 argument is func for calculation, 2 argument is starting position
    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return (currentNumber + item.amount)
    }, 0)

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
            <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton
