import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults() {
        try {
            const finalQuery = `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`;
            console.log(finalQuery);
            const result = await axios(finalQuery);           
            this.result = result.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}