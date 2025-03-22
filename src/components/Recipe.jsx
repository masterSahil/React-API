import React, { useEffect } from 'react';
import '../css/recipe.css';
import star from '../assets/img/star.png';
import { useState } from 'react';
import thumb from '../assets/img/recipes.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const Recipe = () => {

    const [foodName, setFoodName] = useState('');
    const [foodArea, setFoodArea] = useState('');
    const [thumbnail, setThumbnail] = useState(thumb);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [category, setCategory] = useState('');

    const [ingredientContent, setIngredientContent] = useState(false);
    const [InstructionsContent, setInstructionsContent] = useState(false);

    const [ingredientArr, setIngredientArr] = useState('');
    const [measurementArr, setMeasurementArr] = useState('');
    const [instructions, setInstructions] = useState('');

    const URL = `https://www.themealdb.com/api/json/v1/1/random.php`;

    const generate = async () => {

        setLoading(true);
    
        setTimeout(async () => {
            let response = await fetch(URL);
            let data = await response.json();
    
            setFoodName(data.meals[0].strMeal);
            setFoodArea(data.meals[0].strArea);
            setThumbnail(data.meals[0].strMealThumb);
            setSource(data.meals[0].strSource);
            setVideoLink(data.meals[0].strYoutube);
            setCategory(data.meals[0].strCategory);
            setInstructions(data.meals[0].strInstructions);
    
            const ingredients = [];
            const measures = [];
    
            for (let i = 1; i <= 20; i++) { 
                const ingredient = data.meals[0][`strIngredient${i}`];
                const measure = data.meals[0][`strMeasure${i}`];
                
                // Fixed condition: Check for valid ingredient and measure
                if (ingredient && ingredient.trim() !== '') {
                    ingredients.push(`${ingredient}`);
                }
                if (measure && measure.trim() !== '') {
                    measures.push(`${measure}`);
                }
            }
            setIngredientArr(ingredients); 
            setMeasurementArr(measures);

            setLoading(false);
            console.log(data.meals[0]);
        }, 1);
    }
    

    useEffect(() => {
      generate();
    }, [])
    

  return (
    <>
        <main className='main-container2'>
            <div className="container">
                <div className={loading ? "mainImgLoad" : 'mainImg' }>
                    {
                        loading && 
                        <p className='recipe-loader'>Loading ... </p>
                    }
                    <img className= {loading ? 'loadedImg' : 'mainImg'}  src={thumbnail} alt="image" />
                </div>
                <div className="dishContent">
                    <div className="first-info-recipe">
                        <h1 className="dishName">{foodName}</h1>
                        <h1 className="locality">Country: {foodArea}</h1>
                        <h1 className="category">Category: {category}</h1>
                        <div className="btnContent">
                            <button onClick={generate} className='generate'>
                                <img src={star} alt='star-design' className='starImg' />
                                <span className='generateTxt'>Generate</span>
                            </button>
                        </div>
                    </div>
                    <div className="info">
                        <h1 className='recipe-infoHead'>Recipe Information</h1>

                          <p className="source">Recipe Source: <br />
                              {source ? <a href={source} target="_blank" rel="noopener noreferrer" 
                              className='link-avail'>Click me to Open</a> : <span className='non-avail'>Source not available</span>}
                          </p>
                          <p className="videoLink">Video Link: <br />
                              {videoLink ? <a href={videoLink} target="_blank" rel="noopener noreferrer" className='link-avail' >Click me to Open</a> : <span className='non-avail'>Video not available</span>}
                          </p>


                        <div className="btn-group">
                            <button onClick={()=>setIngredientContent(true)} className='btns'>
                                Ingredient</button>
                            <button onClick={()=>setInstructionsContent(true)} className='btns'>
                                Instructions</button>
                        </div>

                        <div className="btnContent2">
                            <button onClick={generate} className='generate'>
                                <img src={star} alt='star-design' className='starImg' />
                                <span className='generateTxt'>Generate</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Ingredient */}
            {
                ingredientContent &&
                <div className="ingredient-content popup-content">
                    <button onClick={() => setIngredientContent(false)} className="close"> 
                        <FontAwesomeIcon icon={faCircleXmark} className='close-icon' />
                    </button>
                    <h2 className='info-heading'>Ingredients <span className="break1"> &  Measurement </span></h2>
                    <div className="ingredient-container">
                        <ol className='ingredients-ol'>
                            {ingredientArr.length > 0 ? (
                                ingredientArr.map((item, index) => (
                                    <li className='info-list' key={index}>{item} - {measurementArr[index]} </li>
                                ))
                            ) : (
                                <p className='info-para'>No Ingredients & Measurement Available</p>
                            )}
                        </ol>
                        <div className="content2">
                            <img src={thumbnail} alt="thumbnail img" className='thumbSmall' />
                            <img src={thumbnail} alt="thumbnail img" className='thumbBig' />
                        </div>
                    </div>
                </div>
            }
            

              {/* Instructions */}
              {
                InstructionsContent &&
                <div className="instructions-content popup-content">
                      <button onClick={() => setInstructionsContent(false)} className="close"> 
                        <FontAwesomeIcon icon={faCircleXmark} className='close-icon' />
                      </button>

                        <div className="instruct-container">
                            <h2 className='info-heading instruct-head'>Instructions</h2>
                            {instructions ? (
                                instructions.split('.').filter(sentence => sentence.trim() !== '').map((sentence, index) => (
                                    <p className='info-para instruct-para' key={index}>
                                        • {sentence.trim()}.
                                    </p>
                                ))
                            ) : (
                                <p className='info-para instruct-para'>No Instructions Available</p>
                            )}
                        </div>
                </div>
              }

        </main>
    </>
  )
}

export default Recipe