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
        //если товар уже лежит в корзине => значит его нужно не добавить, а обновить его кол-во
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
        // если у нас кол-во товара больше 1 и мы его уменьшаем, то просто уменьшаем кол-во
        // если кол-во товара = 1,то при уменьшении кол-ва мы должны удалить его полностью из корзины
        // нам приходит id товара для взаимодействия

        //получаем index массива товара который будем изменять!
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        //получаем сам товар потому что прилетает только его id и в каком месте он лежит мы определили выше
        const existingCartItem = state.items[existingCartItemIndex]

        //товар в который положим изменения
        let updatedCartItem;

        //получили все товары что были в корзине
        let updatedCartItems

        // если товаров менье 2 то нужно удалить его из корзины полностью
        if (existingCartItem && existingCartItem.amount > 1) {
            updatedCartItem = {...existingCartItem, amount: existingCartItem.amount - 1}
            updatedCartItems = [...state.items];
            //заменяем измененный товар
            updatedCartItems[existingCartItemIndex] = updatedCartItem;
        } else {
            //удаляем товар полностью

            //можно так если переменная определена как let выше везде учат делать через фильтр
            updatedCartItems = state.items.filter((item) => item.id !== action.id)
            //еще можно удалить через JS метод splice с какого индекса и сколько
            //    updatedCartItems.splice(existingCartItemIndex, 1);
        }

        //уменьшаем переменную общего кол-ва товаров на -1
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        return {
            items: updatedCartItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'EMPTY_CART') {
        // полностью зачищаем корзину
        return {
            items: [],
            totalAmount: 0
        }
        //     or just return defaultCartState
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

    const clearCartHandler = () => {
        dispatchCartAction({type: 'EMPTY_CART'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCarthandler,
        emptyCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider
