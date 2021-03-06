import React from 'react';
import style from './recipe.module.css';

// const Recipe = ({title, calories, image, ingredients}) => {
//     return(
//         <div className={style.recipe}>
//             <h1>{title}</h1>
//             <ol>
//                 {ingredients.map(ingredient => (
//                     <li>{ingredient.text}</li>
//                 ))}
//             </ol>
//             <p>{calories}</p>
//             <img className={style.image} src={image} alt=""/>
//         </div>
//     )
// }

const Recipe = ({title, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map((ingredient, i) => (
                    <table key={i}>
                        <tbody>
                            <tr>
                                <th>{ingredient.name}</th>
                                <th>{ingredient.quantity}</th>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </ol>
        </div>
    )
}

export default Recipe;