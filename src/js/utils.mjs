// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function getItemsFromLocalStorage(key){
  return getLocalStorage(key) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movie = urlParams.get(param)
  return movie;
}

export function renderListWithTemplate(templateFn, parentElement, list, position="afterbegin", clear = false) {
  const filterList = list.filter(item => item.clear !== true);
  const htmlString = filterList.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

//handling generate footer and header dynamically
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  // Load and render header
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");
  renderWithTemplate(headerTemplate, headerElement);

  // Attach event listener for the form in the header
  const form = headerElement.querySelector("#form"); // Ensure the form has the correct ID
  const searchInput = headerElement.querySelector("#search"); // Ensure the input has the correct ID
  
  if (form && searchInput) {
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `/movies/index.html?search=${encodeURIComponent(searchTerm)}`;
      } else {
        alert("Please enter a search term.");
      }
    });
  }

  // Load and render footer
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");
  renderWithTemplate(footerTemplate, footerElement);
}