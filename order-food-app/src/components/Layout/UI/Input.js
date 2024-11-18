import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input}/>
            {/*Получается что мы сюда передаем и не обрабатываем props по отдельности а сразу кучей и так как они дефолтные все работает налету =)*/}
        </div>
    )
}
export default Input
