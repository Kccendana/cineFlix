import { loadHeaderFooter,getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MovieSearch from "./MovieSearch.mjs";
loadHeaderFooter();

const search = getParam("search");
const dataSource = new ExternalServices(search);
const element = document.querySelector(".movies");
const searchMovie = new MovieSearch(search, dataSource, element)

searchMovie.init();