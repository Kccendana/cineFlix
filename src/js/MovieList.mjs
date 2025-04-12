import { limitText, renderListWithTemplate,getLocalStorage,setLocalStorage, movieCardTemplate } from "./utils.mjs";


export default class MovieList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.movies = [];
        this.heroMovie = [];
    }

    async init() {
        const allMovies = await this.dataSource.getData(this.category);
        if (!allMovies || allMovies.length === 0) return;
    
        const randomNumber = Math.floor(Math.random() * allMovies.length);
        const addCategory = allMovies.map(movie => ({ ...movie, category: this.category }));
        console.log(addCategory);
    
        this.heroMovie = addCategory[randomNumber];
    
        const trailer_key = await this.dataSource.findTrailer(this.category, this.heroMovie.id);
        this.heroMovie.trailer_key = trailer_key;
    
        this.movies = addCategory.filter((_, index) => index !== randomNumber);
    
        this.renderList(this.movies);
        this.renderHero(this.heroMovie);
    }
    renderList(list){
        renderListWithTemplate(movieCardTemplate, this.listElement, list);
        this.attachAddToListEvents();
    }

    renderHero(hero){
        const heroElement = document.querySelector(".hero");
        heroElement.innerHTML = `
        <img class="heroImg" src="https://image.tmdb.org/t/p/original${hero.backdrop_path}" alt="${hero.title} backdrop">
            <div class="desc_con">
                <p class="feature-title">${hero.title || hero.name}</p>
                <p class="f-desc">${limitText(hero.overview)}</p>
                <div class="btnCon">
                    <div id="${hero.id}" class="playBtn btn"><img src="/images/playBtn.svg" alt="playBtn" class="imgBtn"><span class="play">Play</span></div>
                    <a href="../movie_detail/index.html?category=${hero.category}&id=${hero.id}" class="moreInfo btn">More Info</a>
                </div>
            </div>
        `
        const playBtn = document.querySelector(".playBtn");
        playBtn.addEventListener("click", (e)=>{
            const modal = document.querySelector(".video-container");
            modal.style.display = "flex";
            const iframe = document.querySelector(".iframe");
            iframe.src= "https://www.youtube.com/embed/" + hero.trailer_key;
        })

        const closeBtn = document.querySelector(".closeModal");
        closeBtn.addEventListener("click", (e)=>{
            const modal = document.querySelector(".video-container");
            modal.style.display = "none";
            
        })

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
