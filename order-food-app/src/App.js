import './App.css';
import Header from "./components/Layout/Header/Header";
import Meal from "./components/Layout/Meal/Meal";
import Cart from "./components/Layout/Cart/Cart";
import {useState} from "react";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false); //show cart

    const showCartHandler = () => {
        setCartIsShown(true)
    }

    const hideCartHandler = () => {
        setCartIsShown(false)
    }

    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <main>
                <Meal/>
            </main>
        </CartProvider>
    );
}

export default App;
