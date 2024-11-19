import React from 'react'
import mealsImage from "../../../assets/headerImage.jpg"
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meal App</h1>

                <HeaderCartButton onClick={props.onShowCart}/>
            </header>

            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of food"/>
            </div>
        </>
    )
}
export default Header
