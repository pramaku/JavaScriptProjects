import Search from "./models/Search"
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
    const query = 'pizza'; // TODO: get from user interface.
    
    if (query) {
        // New search object and add to state
        state.search = new Search(query);
    }
    
    // prepare UI for results
    
    // search for recipes
    await state.search.getResults();
    
    // render the search results on UI.
    console.log(state.search.result);
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

