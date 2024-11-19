import React from 'react'
import CartContext from "./cart-contex";

const CartProvider = (props) => {

    const addItemToCarthandler = (item) => {

    }

    const removeItemFromCarthandler = (id) => {

    }

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCarthandler,
        removeItem: removeItemFromCarthandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}

        </CartContext.Provider>
    )
}
export default CartProvider
