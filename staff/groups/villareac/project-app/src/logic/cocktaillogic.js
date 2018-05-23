const logic2 = {
    url: "https://www.thecocktaildb.com/api/json/v1/1",
  
     headers() {
       return {
         headers: { Authorization: `Bearer ${this.token}` },
       };
     },
  
     randomCocktail() {
      return fetch(`${this.url}/random.php`)
        .then(data => data.json())
        .then(data => data)
    }
  };
  
  export default logic2