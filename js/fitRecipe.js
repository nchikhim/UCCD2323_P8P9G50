// api
const baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=5dc32b63&app_key=d7154a27aa6bb6d8806ad511088249b2";

// variables
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch=document.querySelector("#txtSearch");
const btnFind=document.querySelector(".btn");
const caloriesMin = document.querySelector("#caloriesMin");
const caloriesMax = document.querySelector("#caloriesMax");
const dietSelect = document.querySelector("#diet");
const allergiesSelect = document.querySelector("#allergies");
const instructionbtn = document.querySelector(".intruction-btn");

const filterToggle = document.querySelector(".filter-toggle");
const filterContainer = document.querySelector("#filter-container");


btnFind.addEventListener("click",()=>{
    loadRecipes(false);
});

txtSearch.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        loadRecipes(false);
    }
})

const setScrollPosition = ()=>{
    recipeContainer.scrollTo({top:0,behavior:"smooth"});
};

function loadRecipes(isInitialLoad = false) {
    let url = baseUrl;

    if (isInitialLoad) {
        // Fetch a default set of recipes for the initial load
        url += "&q=popular";  // Adjust this query to fetch a popular/default set of recipes
    } else {
        // Get the search input
        const type = txtSearch.value.trim();

        // Add the search query to the URL only if there's input in the search bar
        if (type) {
            url += `&q=${type}`;
        }

        // Add filters to the URL
        const minCalories = caloriesMin.value;
        const maxCalories = caloriesMax.value;
        const diet = dietSelect.value;
        const allergies = allergiesSelect.value;

        if (minCalories && maxCalories) {
            url += `&calories=${minCalories}-${maxCalories}`;
        } else if (minCalories) {
            url += `&calories=${minCalories}%2b`;
        } else if (maxCalories) {
            url += `&calories=${maxCalories}`;
        }

        if (diet) {
            url += `&diet=${diet}`;
        }

        if (allergies) { 
            url += `&health=${allergies}`;
        }
    }


    fetch(url)
        .then((res) => res.json())
        .then((data) => renderRecipes(data.hits))
        .catch((error) => console.log("Error fetching recipes:", error))
        .finally(() => setScrollPosition());
}

// Initial load
loadRecipes(true);  // Pass true to indicate it's the initial load

const getRecipeStepsStr =(ingredientLines=[])=> {
    let str = "";
    for(var step of ingredientLines){
        str+=`<li>${step}</li>`;
    }
    return str;
}

const renderRecipes = (recipeList=[]) => {
    if (!recipeContainer) {
        console.error("Recipe container is not defined.");
        return;
    }
    recipeContainer.innerHTML="";
    
    if (recipeList.length == 0) {
        // Display message if no recipes are found
        recipeContainer.innerHTML = "<h5 class='no-recipes-message'>No recipes found. Please try a different search.</h5>";
        return;
    }

    recipeList.forEach((recipeObj) =>{
        const {
            label: recipeTitle, 
            ingredientLines, 
            image:recipeImage,
            calories,
            url
        }=recipeObj.recipe;
        const recipeStepsStr = getRecipeStepsStr(ingredientLines);
        const htmlStr =`<div class="recipe">
                <div class="recipe-title">${recipeTitle}</div>
                <div class="recipe-image">
                    <img src="${recipeImage}" alt="Recipe"/>
                    
                </div>
                <div class="recipe-details">
                    <div class="recipe-calories">
                        <strong>Calories:</strong> ${Math.round(calories)} kcal
                    </div>
                    <button class="instruction-btn" onclick="window.open('${url}', '_blank')">Instructions</button>
                </div>
                    <div class="recipe-text">
                      <ul>
                      ${recipeStepsStr}
                      </ul>
                    </div>             
            </div>`;
        recipeContainer.insertAdjacentHTML("beforeend", htmlStr)
    });
}

function toggleMenu() {
    var filterContainer = document.getElementById('filter-container');
    if (filterContainer.classList.contains('show')) {
        filterContainer.classList.remove('show');
    } else {
        filterContainer.classList.add('show');
    }
}
