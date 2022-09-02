const loadCocktails = cocktail => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    fetch(url)
    .then(response => response.json())
    .then(cocktailData => displayCocktails(cocktailData.drinks))
}

const displayCocktails = cocktails => {
    const cocktailsHolder = document.getElementById('cocktails');
    const allModals = document.getElementById('modal-container');
    let cocktailCount = 1;
    if(cocktails){
        for(const cocktail of cocktails){
            const cocktailDiv = document.createElement('div');
            cocktailDiv.innerHTML = `
            <div class="card card-compact w-80 bg-white rounded-lg shadow-xl mx-5 lg:mx-0">
            <figure><img src="${cocktail.strDrinkThumb}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${cocktail.strDrink}</h2>
              <p class="text-lg lg:text-base">${cocktail.strCategory}, ${cocktail.strAlcoholic}</p>
              <div class="flex justify-start">
              <label for="modal-${cocktailCount}" class="px-4 py-2 modal-btn bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded cursor-pointer">Details</label>
              </div>
            </div>
            </div>
            `;
            cocktailsHolder.appendChild(cocktailDiv)
            const ingredients = []
            const ingredientUrls = [];
            for(let i=1; i<15; i++){
                const ingredient = `strIngredient${i}`
                if(cocktail[ingredient]){
                    ingredients.push(cocktail[ingredient])
                    if(cocktail[ingredient].includes(' ')){
                        const ingName = cocktail[ingredient].replace(' ', '%20');
                        ingredientUrls.push(ingName);
                    }
                    else{
                        ingredientUrls.push(cocktail[ingredient])
                    }
                }
            }
            
            const ingredientNames = document.createElement('div');
            const ingredientsList = document.createElement('ol');
            ingredientsList.classList.add('list-decimal', 'list-inside')
            for(const ingredient of ingredients){
                const li = document.createElement('li');
                li.innerText = `${ingredient}`;
                ingredientsList.appendChild(li);
            }
            ingredientNames.appendChild(ingredientsList);
    
            const ingredientsDiv = document.createElement('div');
            for(const ingredinet of ingredientUrls){
                const img = document.createElement('img');
                img.setAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${ingredinet}-small.png`)
                ingredientsDiv.appendChild(img)
            }
            // Modals
            const cocktailDetails = document.createElement('div');
            cocktailDetails.innerHTML = `
                <input type="checkbox" id="modal-${cocktailCount}" class="modal-toggle" />
                <div class="modal">
                    <div class="modal-box relative bg-gray-400">
                        <label for="modal-${cocktailCount}" class="btn btn-sm btn-circle absolute right-2 top-2 bg-gray-700">✕</label>
                        <div class="card card-compact w-80 shadow-xl mx-auto mt-8">
                            <figure><img src="${cocktail.strDrinkThumb}" /></figure>
                            <div class="card-body bg-gray-200">
                                <div class="grid grid-cols-3 gap-2">${ingredientsDiv.innerHTML}</div>
                                <h2 class="text-2xl font-semibold">${cocktail.strDrink}</h2>
                                <p class="text-lg lg:text-base">${cocktail.strCategory}, ${cocktail.strAlcoholic}</p>
                                <span class="text-lg font-medium">Ingrdients:</span>
                                <div>${ingredientNames.innerHTML}</div>
                                <p>
                                    <span class="text-lg font-medium">Preparation:</span><br>
                                    ${cocktail.strInstructions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            allModals.appendChild(cocktailDetails)
            cocktailCount++;
        }
        document.getElementById('no-cocktails').classList.add('hidden')
    }
    else{
        document.getElementById('no-cocktails').classList.remove('hidden');
    }
}

const searchCocktail = () => {
    document.getElementById('cocktails').innerHTML = ``;
    document.getElementById('modal-container').innerHTML = ``;
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadCocktails(searchValue);
    searchField.value = '';
}

document.getElementById('search').addEventListener('click', function(){
    searchCocktail();
})

document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        searchCocktail();
    }
})

loadCocktails('')