/*
const second = () => {
    setTimeout(() => {
        console.log('second')
    }, 5000);
}

const first = () => {
    console.log('Hey there');
    second();
    console.log('the end');
}

first();
*/

/**********************************
// ES5, asynchronous with call backs
**********************************/
/*
function getRecipe() {
    setTimeout(() => {
        const recipeIds = [1,2,3,4];
        console.log(recipeIds);
        const id = Math.round(Math.random() * 3);
        setTimeout((id) => {
            const recipe = {
                title: 'Fresh Tomato Pasta',
                publisher: 'Jonas'
            }
            console.log(`${id} -> ${recipe.title}`)
            
            setTimeout(publisher => {
                const recipe2 = {
                    title: 'Italian Pizza',
                    publisher: 'Jonas'
                };
                console.log(`${id} -> ${recipe.title} -> ${recipe2.title}`)
            }, 1500, recipe.publisher);
        }, 1500, recipeIds[id]);
    }, 1500);
}

getRecipe();
*/

/*********************************
// ES6 Asynchronous with promises
*********************************/
/*
const recipeId = new Promise((resolve, reject) => {
    setTimeout(() => {
        const recipeId = [1, 2, 3, 4];
        resolve(recipeId);
        //reject('Error in recipe');
    }, 1500);
});

const getRecipe = id => {
    return new Promise((resolve, reject) => {
        setTimeout((id) => {
            const recipe = {
                title: 'Fresh tomato pasta',
                publisher: 'Jonas'
            };
            resolve(`${id} -> ${recipe.title}`);
        }, 1500, id);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
       setTimeout((publisher) => {
           const recipe = {
               title: 'Italian Pizza',
               publisher: 'Jonas'
           };
           resolve(`${publisher} -> ${recipe.title}`);
       }, 1500, publisher);
    });
};
*/
/*
recipeId.then((id) => {
    console.log(id);
    return getRecipe(id[2]);
})
.then((recipe) => {
    console.log(recipe);
    return getRelated('Jonas');
})
.then((recipe) => {
    console.log(recipe);
})
.catch((error) => {
    console.log('Promise rejected - ' + error);
});
*/

/*
// consuming promises with async/await (ES8/2018)
async function getRecipeAsync() {
    const id = await recipeId;
    console.log(id);
    
    const recipe = await getRecipe(id);
    console.log(recipe);
    
    const related = await getRelated('Jonas');
    console.log(related);
    
    return recipe;
};

getRecipeAsync().then(recipe => console.log(`${recipe} is always best`));
*/

/******************************
// AJAX using Fetch and Promise
*******************************/
/*
function getWeather(woeid) {
    response = 
    fetch( `https://corsanywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);

    response.then(result => {
        //console.log(result);
        return result.json();
    })
    .then(data => {
        //console.log(data);
        const today = data.consolidated_weather[0];
        console.log(`temperature in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`);
    })
    .catch(error => {
        console.log('error is GET API - ' + error);
    });
}

getWeather(2487956);
getWeather(44418);
*/

/***********************************
// AJAX with Fetch using async/await
***********************************/
async function getWeatherAW(woeid) {
    try {
        const uri = `https://corsanywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`;
        const response = await fetch(uri);
        const data = await response.json();
        //console.log(data);
        const tomorrow = data.consolidated_weather[1];
        console.log(`temperature in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

getWeatherAW(2487956);
getWeatherAW(44418).then(dataLondon => console.log(dataLondon));









