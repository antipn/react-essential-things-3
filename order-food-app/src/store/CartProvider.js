import React, {useReducer} from 'react'
import CartContext from "./cart-contex";

//значение по умолчанию
const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price
        return ({
            items: updatedItems,
            totalAmount: updatedTotalAmount
        })
    }
    if (action.type === 'REMOVE_ITEM') {

    }
    return defaultCartState

}


const CartProvider = (props) => {


    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCarthandler = (item) => {
        dispatchCartAction({type: 'ADD_ITEM', item: item})

    }

    const removeItemFromCarthandler = (id) => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
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
