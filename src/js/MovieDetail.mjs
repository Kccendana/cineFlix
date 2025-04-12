import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function movieDetailsTemplate(movie) {
    const year = (movie.first_air_date || movie.release_date || '').substring(0, 4);
    const genresHTML = movie.genres
        .map((genre) => `<li>${genre.name}</li>`)
        .join("");
    return `
         <div class="alert">
            <p class="message"></p>
            <span class="close">X</span>
        </div>
        <div class="video-container">
            <div class="video">
              <iframe 
                class="iframe"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/jYuAmonOUvU" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
              </iframe>
            </div>
            <span class="closeModal">x</span>
          </div>
        <div class="hero">
            <img class="heroImg" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="$product.title} backdrop">
                <div class="desc_con">
                    <h1 class="feature-title">${movie.title|| movie.name}</h1>
                    <div class="btnCon">
                        <div id="${movie.id}" class="playBtn btn"><img src="/images/playBtn.svg" alt="playBtn" class="imgBtn"><span class="play">Play</span></div>
                        <div class="add btn">Add to List</div>
                    </div>
                </div>
        </div>
        <section class="movieInfo">
        <div class="contain">
            <div class="year-duration">
            <span class="year">${year}</span>
            <span class="duration">${(movie.episode_run_time?.[0] || movie.runtime) ? `${movie.episode_run_time?.[0] || movie.runtime}m` : ""}</span>
        </div>
        <div class="titleOverviewCon">
            <h2 class="title">${movie.title|| movie.name}</h2>
            <p class="description">${movie.overview}</p>
        </div>
        </div>
        <div class="castGenCon">
            <ul class="cast"></ul>
            <ul class="genres">${genresHTML}</ul>
        </div>
    </section>
    `;
}

export default class MovieDetail {
    constructor(movieId, dataSource, category) {
        this.movieId = movieId;
        this.category = category;
        this.movie = {};
        this.trailer_key = "";
        this.dataSource = dataSource;
    }
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.movie = await this.dataSource.findDataById(this.category, this.movieId);
        console.log(this.movie);

        //get the trailer key
        this.trailer_key = await this.dataSource.findTrailer(this.category, this.movieId);
        console.log(this.trailer_key);
        // once we have the product details we can render out the HTML
        this.renderMovieDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document
            .querySelector(".add")
            .addEventListener("click", () => {
                console.log("clicked")
                this.addToList(this.movie);
            });
        document.querySelector(".close").addEventListener("click", () => {
        const alertBox = document.querySelector(".alert");
        alertBox.style.display = "none";
            });
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
            list.push(this.movie); // Add movie to the list
            setLocalStorage("list", list); // Save the updated list to localStorage

            alert.style.display = "block";
            message.innerHTML = "Added to the list.";
        }      
      }
      
    renderMovieDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            movieDetailsTemplate(this.movie)
        );

        const playBtn = document.querySelector(".playBtn");
        playBtn.addEventListener("click", (e)=>{
            const modal = document.querySelector(".video-container");
            modal.style.display = "flex";
            const iframe = document.querySelector(".iframe");
            iframe.src= "https://www.youtube.com/embed/" + this.trailer_key;
        });

        const closeBtn = document.querySelector(".closeModal");
        closeBtn.addEventListener("click", (e)=>{
            const modal = document.querySelector(".video-container");
            modal.style.display = "none";
            
        });
    }
}

