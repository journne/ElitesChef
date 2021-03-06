import React, { useState, useEffect } from 'react';
import styles from '../meal.module.scss';

const imageUrl = 'http://localhost:5000/';

const Ingredient = ({ index, history, meal, setMeal, deleteAtIndex, setDeleteAtIndex }) => {
    const [checkbx, setCheckbx] = useState(true);
    const [localMeal, setLocalMeal] = useState(meal);
    useEffect(() => {
        if(meal) {
            let newObj = {};
            if(meal.ingredients[index]) {
                newObj.name = meal.ingredients[index].name;
                newObj.image = meal.ingredients[index].image;
                newObj.inBox = meal.ingredients[index].inBox;
            }
            // if(meal.ingredients[index].image) newObj.image = meal.ingredients[index].image;
            // if((meal.ingredients[index].name || meal.ingredients[index].image) & meal.ingredients[index].inBox) newObj.inBox = meal.ingredients[index].inBox;
            if(!newObj.name & !newObj.image){
                let newState = meal;
                newObj.inBox = checkbx;
                newState.ingredients.push(newObj);
                setLocalMeal({...newState});
                setMeal({...newState});
            }
        }
        console.log('init', typeof localMeal.ingredients[0].image);
    }, []);



    const handleIngredient = e => {
        const param = e.currentTarget.id.split(' ')[0];
        let newState = localMeal;
        if(newState && index < newState.ingredients.length) {
            // update
            if(param === 'inBox') {
                console.log('inBox', newState.ingredients[index][param]);
                newState.ingredients[index][param] = !newState.ingredients[index][param];
                console.log('new state', newState.ingredients[index][param]);
                setCheckbx(!checkbx);
            } else if (param === 'image') {
                // console.log('image', e.currentTarget.files[0]);
                newState.ingredients[index][param] = e.currentTarget.files[0];
            } else {
                newState.ingredients[index][param] = e.currentTarget.value;
            }
            setLocalMeal({...newState});
            setMeal({...newState});
        } else if(newState) {
            // insert put
            let newObj = {};
            if(param === 'inBox') {
                newObj[param] = !checkbx;
                setCheckbx(!checkbx);
            } else if (param === 'image') {
                // console.log('image', e.currentTarget.files[0]);
                newObj[param] = e.currentTarget.files[0];
                newState.ingredients.push(newObj);
            } else {
                newObj[param] = e.currentTarget.value; 
                newState.ingredients.push(newObj);
            }
            setLocalMeal({...newState});
            setMeal({...newState});
        } else {
            // insert post
            newState = { ingredients: [] };
            let newObj = {};
            if(param === 'inBox') {
                newObj[param] = !checkbx;
                setCheckbx(!checkbx);
            } else if (param === 'image') {
                // console.log('image', e.currentTarget.files[0]);
                newObj[param] = e.currentTarget.files[0];
                newState.ingredients.push(newObj);
            } else {
                newObj[param] = e.currentTarget.value; 
                newState.ingredients.push(newObj);
            }
            setLocalMeal({...newState});
            setMeal({...newState});
        }
    };
    const handleDelete = () => {
        let newIndices = [...deleteAtIndex];
        console.log([...deleteAtIndex]);
        newIndices.push(index);
        setDeleteAtIndex(x => [...x, index]);
        console.log('deleted indices', newIndices, deleteAtIndex, index, !deleteAtIndex.includes(index));
        console.log(meal, 'axios put');
    };

    return (
        <div>
            <div className="border">
                <div className="text-right">
                    <i onClick={handleDelete} className="mdi mdi-alpha-x-box" style={{ cursor: "pointer" }} />
                </div>
                <div className="col-md-6">
                    <div className="form-group row">
                        <label htmlFor="ingredient" className="col-lg-5 col-form-label">Ingredient</label>
                        <div className="col-lg-7">
                            <input onChange={handleIngredient} name="ingredientName" id={`name ${index}`} className="form-control" type="text" defaultValue={meal && meal.ingredients[index] ? meal.ingredients[index].name : ""} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="image" className="col-lg-5 col-form-label">Image</label>
                        <div className="col-lg-7">
                            <input type="file" onChange={handleIngredient} name="image" id={`image ${index}`} className="form-control" /> 
                            { localMeal.ingredients[index] && typeof localMeal.ingredients[index].image === 'string' ? <img className={styles.uploaded} src={imageUrl + localMeal.ingredients[index].image.substring(7)} /> : null }
                            {/* defaultValue={meal && meal.ingredients[index] ? meal.ingredients[index].image : ""} /> */}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inBox" className="col-lg-5 col-form-label">Is in Box?</label>
                        <div className="col-lg-7">
                            <input onChange={handleIngredient} name="inBox" id={`inBox ${index}`} type="checkbox" className="form-control" checked={meal && meal.ingredients[index] ? meal.ingredients[index].inBox : checkbx} value={meal && meal.ingredients[index] ? meal.ingredients[index].inBox : checkbx} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ingredient;
