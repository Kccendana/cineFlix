import { setLocalStorage, loadHeaderFooter, getItemsFromLocalStorage } from "./utils.mjs";

//to render the data in the localStorage
function renderListContents(key) {
  const listItems = getItemsFromLocalStorage(key) || [];
  const htmlItems = listItems.map((item) => listItemTemplate(item));
  document.querySelector(".movies").innerHTML = htmlItems.join("");
}

//template for the list
function listItemTemplate(item) {
  const newItem = `<li class="movie-cards">
            <div class="movie">
               <img src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.title} poster">
    
                <span class="rating">${item.vote_average.toFixed(0)}</span>
            
                <div class="overview">
                    <p>${item.overview}</p>
                    <div class="btnCon">
                    <a href="../movieDetails/index.html?/${item.category}/id=${item.id}" class="know-more btn" id="${item.id}">Know More</a>
                    <div class="remove btn" data-id="${item.id}" id="${item.id}">Remove</div>
                    </div>
                    
                </div>
            </div>
      </li>`;

  return newItem;
}

//remove Item when remove button is clicked
function removeItem(itemId) {
  let listItems = getItemsFromLocalStorage("list");
  const alert = document.querySelector(".alert");
  const message = document.querySelector(".message");
  

  if (listItems) {
    const itemToRemove = listItems.find((item) => item.id === parseInt(itemId));
    listItems = listItems.filter((item) => item.id !== parseInt(itemId));
    setLocalStorage("list", listItems);
    renderListContents("list");

    if (itemToRemove){
      message.innerHTML = `${itemToRemove.title || itemToRemove.name} has been removed`
      alert.style.display = "block";
    }
    
    removeListeners();
  }
}
document.querySelector(".close").addEventListener("click", (e)=> {
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
})
//add eventlisteners to all the button
function removeListeners() {
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.id;
      removeItem(itemId);
    });
  });
}

loadHeaderFooter();
renderListContents("list");
removeListeners();