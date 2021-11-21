const search = document.getElementById("search-btn");
const searchInput = document.getElementById("user-input");
const meal = document.getElementById("meal");
const mealGrid = document.getElementById("mealGrid")
const meal_item = document.querySelector("meal-item");
const recipe = document.getElementById("recipe")
const recipe_guide = document.getElementById("instructions")
const recipe_close_btn = document.getElementById("close-btn")

search.addEventListener("click", getMeals);
meal.addEventListener("click", showRecipe);
recipe_close_btn.addEventListener("click", () => {
  recipe.classList.remove("show-recipe")
})

function getMeals() {
  let searchTerm = searchInput.value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";

      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <strong>${meal.strMeal}</strong>
                    <img src="${meal.strMealThumb}" alt="food image" />
                    <button class="recipe-btn">Recipe</button>
                </div>
                  `;
        });
        meal.classList.remove("notFound")
      } else {
        html = "Sorry, we didn't find any food with the searched ingredient!";
        meal.classList.add("notFound")

      }
      meal.innerHTML = html;
    });
}

function showRecipe(e) {
  e.preventDefault;
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => {
        let meal = data.meals[0]

        let html = `
          <p class="instruct-text" id="meal-category">${meal.strCategory}</p>
          <p class="instruct-text" id="meal-name">Meal: ${meal.strMeal}</p>
          <img src="${meal.strMealThumb}" alt="" />
          <div class="instruction">
            <p>
              ${meal.strInstructions}
            </p>
            <button type="button"><a href=${meal.strYoutube} target="_blank">video</a></button>
          </div>
        `;

        recipe_guide.innerHTML = html
        recipe.classList.add("show-recipe")
      })
  }
}
