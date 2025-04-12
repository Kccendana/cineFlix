import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ExternalServices();
const category = "movie";
const element = document.querySelector(".movies");
const list = new MovieList(category, dataSource, element);
list.init();

//tv trending movies

const tvdataSource = new ExternalServices();
const tvcategory = "tv";
const tvelement = document.querySelector(".tv");
const tvlist = new MovieList(tvcategory, tvdataSource, tvelement);
tvlist.init();

const closeMessage = document.querySelector(".close")
closeMessage.addEventListener("click", () => {
    const alertBox = document.querySelector(".alert");
    alertBox.style.display = "none";
  });
