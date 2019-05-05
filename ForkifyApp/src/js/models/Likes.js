export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike (id, title, author, image) {
        const like = {
            id,
            title,
            author,
            image
        };
        this.likes.push(like);
        
        // persist the data in local storage.
        this.persistData();
        return like;
    }

    deleteLike (id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        // persist the data in local storage.
        this.persistData();
    }

    isLiked (id) {
        const index = this.likes.findIndex(el => el.id === id);
        return index != -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    
    readStorage() {
        const data = localStorage.getItem('likes');
        if (data) {
            // restoring from local storage
            this.likes = JSON.parse(data);
        }
    }
};