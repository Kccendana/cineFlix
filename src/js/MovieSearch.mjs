import { movieCardTemplate, getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";


export default class MovieSearch {
    constructor(query, dataSource, element){
        this.query = query;
        this.dataSource = dataSource;
        this.listElement = element;
        this.movies = [];
    }
    async init() {
        // use our datasource to get the movies base on the query
        this.movies = await this.dataSource.searchMovie(this.query);
        //add category movie
        const addCategory = this.movies.map(movie => ({ ...movie, category: "movie" }));
        this.movies = addCategory;
        console.log(this.movies);
        //render movie lists
        this.renderList(this.movies);
    }
    renderList(list){
        //use the template in the utilities
        renderListWithTemplate(movieCardTemplate, this.listElement, list);
        this.attachAddToListEvents();
        const closeMessage = document.querySelector(".close")
        closeMessage.addEventListener("click", () => {
            const alertBox = document.querySelector(".alert");
             alertBox.style.display = "none";});
    }
    addToList(movie) {
        let list = getLocalStorage("list") || [];
      
        // Check if movie already exists in list
        const existing = list.find(item => item.id === movie.id);
      
        const alert = document.querySelector(".alert");
        const message = document.querySelector(".message");

        if (existing) {
            alert.style.display = "block";
            message.innerHTML = "Already in the list."
        } else {
            list.push(movie); // Add movie to the list
            setLocalStorage("list", list); // Save the updated list to localStorage

            alert.style.display = "block";
            message.innerHTML = "Added to the list.";
        }
      }
    attachAddToListEvents() {
        document.querySelectorAll(".add").forEach(button => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const id = Number(e.target.id);
            const movie = this.movies.find(m => m.id === id);
            if (movie) {
              this.addToList(movie);
            }
          });
        });
      }

    
}