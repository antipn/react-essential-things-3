import React, {useContext, useEffect, useState} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../../store/cart-contex";


const HeaderCartButton = (props) => {

    const [btnIsHigligted, setBtnIsHiglighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    //reduce working with array and provide 1 value in the end
    // 1 argument is func for calculation, 2 argument is starting position

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return (currentNumber + item.amount)
    }, 0)

    const btnClasses = `${classes.button} ${btnIsHigligted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHiglighted(true);
        //arrow function
        const timer = setTimeout(() => {
            setBtnIsHiglighted(false);
        }, 300);


        //cleanup function this return will be run always automatically we should provide code like this
        return () => {
            clearTimeout(timer)
        };

    }, [items]);


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
            <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton
