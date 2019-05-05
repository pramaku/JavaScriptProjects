import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";

import * as searchView from "./views/SearchView";
import * as recipeView from "./views/RecipeView";
import * as listView from "./views/ListView";
import * as likesView from "./views/LikesView";
import {elements, renderLoader, clearLoader} from "./views/base";

/** global state of the app --
* - Search object
* - Current Recipe Object
* - Shopping list object
* - Liked recipes
*/
var state = {
    
};

/**
** Search Controller
**/
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput();

    if (query) {
        // New search object and add to state
        state.search = new Search(query);
    }

    // prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
        // search for recipes
        await state.search.getResults();

        // render the search results on UI.
        clearLoader();
        searchView.renderResults(state.search.result);
    } catch (error) {
        alert(`error getting recipe list ${error}`);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, gotoPage);
    }
});

/**
* RECIPE Controller
**/
const controlRecipe = async () => {
    // get id from url
    const id = window.location.hash.replace('#', '');
    if (id) {
        // prepare UI for recipe.
        renderLoader(elements.recipe);
        recipeView.clearRecipe();

        if (state.search) {
           searchView.highlightSelected(id);
        }

        // create recipe object
        state.recipe = new Recipe(id); // remove '#'

        try {
            // get the recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // caluculate the servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // render the recipe model to UI
            clearLoader();
            let recipeLiked = false;
            if (state.likes) {
                recipeLiked = state.likes.isLiked(id);
            }
            recipeView.renderRecipe(state.recipe, recipeLiked);
        } catch (error) {
            alert(`Error getting recipe : ${error}`)
        }
    }
}

/**
* LIST Controller
**/
const controlList = () => {
    // Create a new list, if not yet created
    if (!state.list) {
        state.list = new List();
    }

    // add each ingredients to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        
        // render item to UI
        listView.renderItem(item);
    })

}

/**
* LIST Controller
**/
const controlLike = () => {
    // create like if not already.
    if (!state.likes) {
        state.likes = new Likes();
    }

    const recipeId = state.recipe.id;
    if (!state.likes.isLiked(recipeId)) {
        // user has not yet liked current recipe

        // add like to the state.
        const newLike = state.likes.addLike(
            recipeId, state.recipe.title, state.recipe.author, state.recipe.image);

        // toggle the like button
        likesView.toggleLikeButton(true);

        // add like to UI list.
        likesView.renderLike(newLike);
    } else {
        // user has already liked current recipe

        // remove like from state.
        state.likes.deleteLike(recipeId);

        // toggle the like button.
        likesView.toggleLikeButton(false);

        // remove like from UI list.
        likesView.deleteLike(recipeId);
    }
    
    likesView.toggleLikesMenu(state.likes.getNumLikes());
}

// adding same listener for multiple events
['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, controlRecipe);
});

// adding handler for serving buttons
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // servings decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //servings increase button is clicked
        state.recipe.updateServings('inc');
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // adding inredients to shopping list.
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Recipe like button is clicked.
        controlLike();
    }
    
    recipeView.updateServingsIngredients(state.recipe);
});

// handle delete and update items
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    // handle delete event.
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        
        // delete from UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count__value')) {
        const value = parseFloat(e.target.value);
        if (value > 0) {
            state.list.updateCount(id, value);
        }
    }
});

// restore liked recipes when page loads.
window.addEventListener('load', () => {
    state.likes = new Likes();

    // restore the likes from storage
    try{
        state.likes.readStorage();
    

    // enable the like button
    likesView.toggleLikesMenu(state.likes.getNumLikes());

    // render the likes.
    state.likes.likes.forEach(like => {
        likesView.renderLike(like);
    });
    } catch (error) {
        console.log(error);
    }
});