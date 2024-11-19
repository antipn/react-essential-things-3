import './App.css';
import Header from "./components/Layout/Header/Header";
import Meal from "./components/Layout/Meal/Meal";
import Cart from "./components/Layout/Cart/Cart";

function App() {
    return (
        <>
            <Cart/>
            <Header/>
            <main>
                <Meal/>
            </main>
        </>
    );
}

export default App;
