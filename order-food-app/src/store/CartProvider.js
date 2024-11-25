import React, {useReducer} from 'react'
import CartContext from "./cart-contex";

//значение по умолчанию и вообще как мы видим как будет выглядеть объект
const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price
        //вернет индекс элемента если он уже есть в массиве в корзине товаров
        const existingCartItemsIndex = state.items.findIndex((item) =>  //true of false
            item.id === action.item.id
        )
        //получаем товар который уже лежит в корзине а мы хотим добавить такой же => значит обновим его кол-во вместо добавления
        const existingCartItem = state.items[existingCartItemsIndex];
        let updatedCartItems; //
        //если товар уже лежит в корзине => значит его нужно не добавить а обновить его кол-во
        if (existingCartItem) {
            console.log('Товар уже есть в корзине с индексом = ' + existingCartItemsIndex)
            const updatedCartItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            //updatedCartItems = [...state.items, updatedCartItem] // так в конец добавится новый и будет задвоение!
            updatedCartItems = [...state.items] //добавили все позиции через копию, напрямую ничего не меняется
            updatedCartItems[existingCartItemsIndex] = updatedCartItem;//через индекс товара который изменился заменяем точечно
        } else {
            console.log('Товар не было в корзине')
            updatedCartItems = state.items.concat(action.item);
        }
        return ({
            items: updatedCartItems,
            totalAmount: updatedTotalAmount
        })
    }
    if (action.type === 'REMOVE_ITEM') {

    }
    return defaultCartState

}


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD_ITEM', item: item})
    }

    const removeItemFromCarthandler = (id) => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCarthandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider
