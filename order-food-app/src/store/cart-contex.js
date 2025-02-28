import React from "react";


//мы описываем как будет выглядеть контекст корзины в данном случае в нашем приложении
// мы описали массив товаров + общее кол-во товаров для отображения у корзины
// + что у нас будет 2 функции: добавление и удаление товаров из корзины
// логику мы тут не описываем
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {
    },
    removeItem: (id) => {
    },
    emptyCart: () => {
    }
});

export default CartContext;