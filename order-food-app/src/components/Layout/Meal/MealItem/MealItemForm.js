import React, {useRef, useState} from 'react'
import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    //с кастомными компонентами рефы не работают из коробки
    //необходимо обернуть компонент React.forwardRef в <Input.js>
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value; //ref is always string
        const enteredAmountNumber = +enteredAmount; //converting String to Number is JS
        // const enteredAmountNumber2 = Number(enteredAmount); //converting String to Number by func Number
        // const enteredAmountNumber3 = parseInt(enteredAmount); //converting String to Number by func parseInt


        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 10) {
            setAmountIsValid(false);
            return //small validation and returning nothing from submitHandler
        }

        props.onAddToCart(enteredAmountNumber) //у нас в этом элементе нет инфомрации о товаре только о количестве (no id here!)

    }

    return (
        //чтобы не было стандартной проверки элементов формы которые на английском языке можно их отключить, к сожалению для элементов вне формы этого не сделать
        //To disable HTML validation, use noValidate, it`s camel case sensitve: https://stackoverflow.com/questions/31021922/how-to-disable-html-validation-in-react-using-formsy-react
        <form className={classes.form} onSubmit={submitHandler} noValidate>

            <Input
                ref={amountInputRef}
                label="Amount" input={{
                id: 'Amount',
                type: 'number',
                min: '1',
                max: '10',
                step: '1',
                defaultValue: '1'
            }}/>
            <button>Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-10))</p>}
        </form>
    )
}
export default MealItemForm
