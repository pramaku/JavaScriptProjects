import axios from 'axios';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'a4a91f99f06770ba04c52b9e75ce63b8';
        try {
            const finalQuery = `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`;
            const result = await axios(finalQuery);
            this.result = result.data.recipes;
            /*
            this.result.map((cur) => {
                console.log(cur.publisher + ' -> ' + cur.title);
                console.log('---------------------------------');
            });
            */
        } catch (error) {
            alert(error);
        }
    }
}