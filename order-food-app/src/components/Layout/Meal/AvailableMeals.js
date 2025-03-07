import React, {useEffect, useState} from 'react'
import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


//We moved meals to backend on Firebase
//https://console.firebase.google.com/project/react-essential-things-3/database/react-essential-things-3-default-rtdb/data/~2F
// const DUMMY_MEALS = [{
//     id: 'm1', name: 'Sushi', description: 'Finest fish and veggies', price: 22.99,
// }, {
//     id: 'm2', name: 'Schnitzel', description: 'A german specialty!', price: 16.5,
// }, {
//     id: 'm3', name: 'Barbecue Burger', description: 'American, raw, meaty', price: 12.99,
// }, {
//     id: 'm4', name: 'Green Bowl', description: 'Healthy...and green...', price: 18.99,
// },];

const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    //не может работать с Promise и соответственно с async await просто в лоб не прокатит
    useEffect(() => {
        //async возвращает Promise
        //особенность Firebase что он возвращает не массив данных, а объект который мы должны разложить в массив самостоятельно!
        //видно при запуске запроса, что возвращается объект, а мы обычно в своих приложениях получаем массивы!
        const fetchMeals = async () => {
            const response = await fetch('https://react-essential-things-3-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
            if (!response.ok) {
                //после этого код после ошибки не будет выполниться, как в java
                throw new Error('Failed to fetch meals')
            }
            const responseData = await response.json();
            //мы получаем объект, а нужно получить массив
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }

        //классически try catch тут не срабатывает из-за того что у нас Promise ожидается
        //так как у нас useEffect не может быть async мы не можем тут добавить await, либо делать доп функцию проверки ошибки либо делать так:
        fetchMeals().catch((error) => {
            //произошла ошибка и мы уже не загружаем данные
            setIsLoading(false);
            setHttpError(error.message)

        });


    }, []);

    if (isLoading) {
        return <section className={classes.MealsLoading}><p>Loading...</p></section>
    }

    if (httpError) {
        return <section className={classes.MealsError}><p>{httpError}</p></section>
    }

    const mealsList = meals.map(meal => <MealItem key={meal.id}
                                                  id={meal.id}
                                                  name={meal.name}
                                                  description={meal.description}
                                                  price={meal.price}/>)
    return (<section className={classes.meals}>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>)
}
export default AvailableMeals
