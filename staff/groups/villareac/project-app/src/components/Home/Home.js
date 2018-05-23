import React from "react";
import "../Main/main.css";

/**
 * The Home page where the user lands once the login process is made.
 *
 * @function Home
 * @returns {function} - a dummy component that prints the Home page.
 */
function Home(props) {
  return (
    <div className="container cocktail">
      <section className="firstSection">
        <button className="button" onClick={props._handlerShowCocktail}>
          Get Your Cocktail of The Day
        </button>
        <h2>{props.cocktailRandomData.strDrink}</h2>
        <p>{props.cocktailRandomData.strInstructions}</p>
        <h4>{props.cocktailRandomData.strCategory}</h4>
        <h4>{props.cocktailRandomData.strAlcoholic}</h4>
        <h4>{props.cocktailRandomData.strGlass}</h4>
        <br />
        {props.cocktailRandomData.strIngredient1 ? (
          <h3>Cocktail ingredients:</h3>
        ) : (
          ""
        )}
        {props.cocktailRandomData.strIngredient1 ? (
          <p>
            {props.cocktailRandomData.strIngredient1}:{" "}
            {props.cocktailRandomData.strMeasure1}
          </p>
        ) : (
          ""
        )}
        {props.cocktailRandomData.strIngredient2 ? (
          <p>
            {props.cocktailRandomData.strIngredient2}:{" "}
            {props.cocktailRandomData.strMeasure2}
          </p>
        ) : (
          ""
        )}
        {props.cocktailRandomData.strIngredient3 ? (
          <p>
            {props.cocktailRandomData.strIngredient3}:{" "}
            {props.cocktailRandomData.strMeasure3}
          </p>
        ) : (
          ""
        )}
        {props.cocktailRandomData.strIngredient4 ? (
          <p>
            {props.cocktailRandomData.strIngredient4}:{" "}
            {props.cocktailRandomData.strMeasure4}
          </p>
        ) : (
          ""
        )}
        {props.cocktailRandomData.strIngredient5 ? (
          <p>
            {props.cocktailRandomData.strIngredient5}:{" "}
            {props.cocktailRandomData.strMeasure5}
          </p>
        ) : (
          ""
        )}
      </section>
      <section className="secondSection">
        <img
          src={props.cocktailRandomData.strDrinkThumb}
          alt={props.cocktailRandomData.strDrink}
        />
      </section>
    </div>
  );
}

export default Home;
