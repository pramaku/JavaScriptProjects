import Search from "./models/Search";
import * as searchView from "./views/SearchView";
import {elements} from "./views/base";

/** global state of the app --
* - Search object
* - Current Recipe Object
* - Shopping list object
* - Liked recipes
*/
var state = {
    
};

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

    // search for recipes
    await state.search.getResults();
    
    // render the search results on UI.
    searchView.renderResults(state.search.result);
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

