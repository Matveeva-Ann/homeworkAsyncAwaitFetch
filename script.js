
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const filmsBox = document.querySelector('.films-box');
const films = document.querySelector('.films');

searchInput.addEventListener("input", function () {
  searchInput.value !== ""
    ? (searchInput.nextElementSibling.style.display = "block")
    : remove();
    document.querySelector('.err').style.display = 'none';
});

function remove() {
  searchInput.value = "";
  searchInput.nextElementSibling.style.display = "none";
}

async function getData() {
  try {
    const textFromInput = searchInput.value;
    const response = await fetch(`http://www.omdbapi.com/?s=${textFromInput}&apikey=b620401b`);
    const data = await response.json();
    createCard(data.Search);
  } 
  catch (err) {
    document.querySelector('.err').style.display = 'block';
    return console.error(err);
  }
  remove();
}
searchBtn.addEventListener("click", getData);

function createCard(arr) {
  if (arr){
    films.innerHTML = '';
  }
  for (const elem of arr) {
    let clon = filmsBox.cloneNode(true);
    films.appendChild(clon);
    clon.setAttribute("data-id", `${elem.imdbID}`);
    clon.firstElementChild.style.background = `url(${elem.Poster})`;
    clon.firstElementChild.nextElementSibling.innerHTML = `${elem.Title}`;
    clon.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `${elem.Type} <br> ${elem.Year}`;
  }
  films.style.display = "flex";
}

films.addEventListener('click', async function(event){
    const idFilm = event.target.parentElement.getAttribute("data-id");
    const response = await fetch(`http://www.omdbapi.com/?i=${idFilm}&apikey=b620401b`);
    const data = await response.json();
    createAllFilmInfo(data);
})

function createAllFilmInfo(obj){
    const text = document.querySelector('.allFilmInfo-conteiner-text').children;
    const img = document.querySelector('.allFilmInfo-conteiner-img');
    img.style.backgroundImage = `url(${obj.Poster})`; 
    text[0].textContent=obj.Title;
    text[1].textContent=obj.Plot;
    text[2].children[1].textContent = obj.Writer;
    text[3].children[1].textContent = obj.Director;
    text[4].children[1].textContent = obj.Actors;
    text[5].children[1].textContent = obj.BoxOffice;
    text[6].children[1].textContent = obj.Awards;
    for (const elem of obj.Ratings) {
      text[7].children[1].innerHTML = '<br>'+ elem.Source + ' ' + elem.Value;
    }
    document.querySelector('.allFilmInfo').style.display = 'flex';
    document.addEventListener('click', function(event){
        let e = document.querySelector('.allFilmInfo-conteiner');
        if (!e.contains(event.target)) {
            document.querySelector('.allFilmInfo').style.display='none';           
        }
    })
}
