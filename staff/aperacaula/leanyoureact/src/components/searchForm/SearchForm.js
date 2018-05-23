import React from "react";

function SearchForm(props) {
  return (
    <form onSubmit={props._handlerSearchUser}>
      <input type="text" onChange={props._handlerWriteName} />
      <button type="submit">{props.buttonText}</button>
    </form>
  );
}

export default SearchForm;
