import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const finalQuery = `${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`;
            const res = await axios(finalQuery);
            //console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }

    calcTime () {
        // 15 mins for every 3 ingredients
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
    
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        let ingredients = this.ingredients;
        ingredients = ingredients.map(cur => {
            // uniform units
            let ingredient = cur.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitsShort[index]);
            });
            
            // remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            // parse ingredient into count, unit, ingredient.
            var arrIng = ingredient.split(' ');
            var index = arrIng.findIndex(cur => unitsShort.includes(cur));
            let ingObj;
            if (index > -1) {
                // there is a unit in ingredient.
                // Ex 4 cups .. arrCount -> [4]
                // 4 1/2 cups .. arrCount -> [4, 1/2]
                let arrCount = arrIng.slice(0, index);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    // for some ingredients, the units is mentioned twice but not at same place.
                    // ex: 2 packages Active Dry Yeast, 0.25 Ounce Packets
                    arrCount = arrCount.map(el => {
                        el = parseFloat(el);
                        if (typeof el === 'number' && !isNaN(el)) {
                            return el;
                        } else {
                            return 0;
                        }
                    })
                    count = eval(arrCount.join('+'));
                }
                ingObj = {
                    count: count,
                    unit: arrIng[index],
                    ingredient: arrIng.slice(index + 1).join(' ')
                };
            } else {
                if (parseInt(arrIng[0], 10)) {
                    // there is no Unit, but first element is number
                    ingObj = {
                        count: parseInt(arrIng[0], 10),
                        unit: '',
                        ingredient: arrIng.slice(1).join(' ')
                    };
                } else {
                    // there is no unit and no number.
                    ingObj = {
                        count: 1,
                        unit: '',
                        ingredient
                    };
                }
            }
            return ingObj;
        });
        this.ingredients = ingredients;
    }

    updateServings (type) {
        // update servings.
        const newServings = type === 'dec'? this.servings - 1: this.servings + 1;

        // update ingredients
        this.ingredients.forEach(cur => {
            cur.count *= (newServings / this.servings);
        });
        
        this.servings = newServings;
    }
}
