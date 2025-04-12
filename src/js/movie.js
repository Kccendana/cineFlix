import { loadHeaderFooter, getParam } from "./utils";
import ExternalServices from "./ExternalServices.mjs";
import MovieDetail from "./MovieDetail.mjs";

const category = getParam("category");
const dataSource = new ExternalServices(category);
const movieId = getParam("id");

const movie = new MovieDetail(movieId, dataSource, category);

movie.init();
loadHeaderFooter();

