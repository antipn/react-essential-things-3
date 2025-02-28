import React, {useRef, useState} from 'react'
import classes from './Checkout.module.css'


const isEmpty = (value) => {
    return value.trim() === ''
}

const isFiveNumber = (value) => {
    console.log('Проверка:')
    console.log('value.trim().length === 5 = ', value.trim().length === 5)
    //isNan - check that value is Not a Number
    console.log('длина строки ', value.trim().length)
    console.log('!isNaN(value) = ', !isNaN(value))

    return value.trim().length === 5 && !isNaN(value)
}


const Checkout = (props) => {

    //for errors showing
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

//validation
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveNumber(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

//for errors appearing if false in fields below
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalIsValid,
            city: enteredCityIsValid,
        })

        const formIsValid =
            enteredStreetIsValid &&
            enteredPostalIsValid &&
            enteredCityIsValid &&
            enteredNameIsValid;

        if (!formIsValid) {
            return;
        }
        //submitting data here
        // console.log("enteredPostalIsValid = ", enteredPostalIsValid);
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalIsValid
        })
    }


    return (<form className={classes.form} onSubmit={confirmHandler}>
            {/*расширяем кол-во стилей если форма заполнена неправильно за счет класса invalid
            это можно вынести в переменную до формы
            типа так: const nameControl = `${clasees.control} ${formInputsValidity.name ? '' : classes.invalid}` и применять в div
            */}
            <div className={
                `${classes.control} 
                 ${formInputsValidity.name ? '' : classes.invalid}`
            }>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" ref={nameInputRef}></input>
                {!formInputsValidity.name && <p>Please enter a valid name</p>}

            </div>
            <div className={
                `${classes.control} 
                 ${formInputsValidity.street ? '' : classes.invalid}`
            }>
                <label htmlFor="street">Your Address</label>
                <input type="text" id="street" ref={streetInputRef}></input>
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={
                `${classes.control} 
                 ${formInputsValidity.postalCode ? '' : classes.invalid}`
            }>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef}></input>
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
            </div>
            <div className={
                `${classes.control} 
                 ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}></input>
                {!formInputsValidity.city && <p>Please enter a valid city name</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>

        </form>
    )
}
export default Checkout
