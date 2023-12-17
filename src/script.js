//Урок 10.1

// *********Links********* \\
// https://www.postman.com/downloads/
// https://rickandmortyapi.com/documentation
// https://www.weatherapi.com/docs/




//Fetch

// fetch("https://rickandmortyapi.com/api/character")
//       .then(response => console.log("then",response))
//       .catch(err => console.log("catch", err))
      

// fetch("https://rickandmortyapi.com/api/character")
//       .then(data => {
//         if(!data.ok){
//             throw new Error("return then")
//         }
//         return data.json() 
//       })
//       .then(result => console.log(result))
//       .catch(err => console.log("catch", err))



// Обробка помилок та парсинг відповіді


// ***************Практика*************** \\

// Потрібно створити функціонал для отримання прогнозу
// погоди в місті.
// Використай публічне API https://www.weatherapi.com/docs/
// Використовуй ендпоінт Forecast для того, щоб отримати
// прогноз погоди на декілька днів.

// Створи форму в яку користувач:
// 1 вводить назву міста.
// 2 обирає на яку кількість днів він хоче отримати прогноз погоди
// (3, 5 та 7 днів).
// (Іноді параметр не працює в такому випадку можна зробити
// пошук на 1, 2 та 3 дні)
// Приклад форми https://prnt.sc/kFmLOj6gBdv-

// Після сабміту форми відмалюй картки з інформацією
// отриманою з бекенду.
// Картка має містити відомості про:
// 1 Зображення з погодою (icon)
// 2 Текст з погодою (text)
// 3 Дату (date)
// 4 Середню температуру в Цельсія (avgtemp_c)
// Приклад картки https://prnt.sc/h_p-A6Hty-i-

// !!! ЗВЕРНИ УВАГУ ЩО API_KEY ПІСЛЯ РЕЄСТРАЦІЇ ВАЛІДНИЙ 21 ДЕНЬ !!!.


// const searchForm = document.querySelector(".js-search-form")
// const list = document.querySelector(".js-list")
// console.log(searchForm);
// console.log(list);

// searchForm.addEventListener("submit", handleSearch)

// function handleSearch(event){
//   event.preventDefault();

//   const { city, days} = event.currentTarget.elements;

//   // console.log("city", city.value);
//   // console.log("days", days.value);

//   serviceWeather(city.value, days.value)
//   .then(data => {
//     list.innerHTML = createMarkup(data.forecast.forecastday)
//   })
//   .catch(error => console.log(error))
//   .finally(() => searchForm.reset())
// }

// function serviceWeather(city = "", days = 1){
//   const BASE_URL = "http://api.weatherapi.com/v1";
//   const API_KEY = "47cce444510845a3b5890337232811";

//   const params = new URLSearchParams({
//     key: API_KEY,
//     q: city,
//     days: days,
//     lang: "uk"
//   })

//   return fetch(`${BASE_URL}/forecast.json?${params}`)
//   .then(response => {
//     if(!response.ok){
//       throw new Error(response.statusText)
//     }
//     return response.json();
//   })
// }

// function createMarkup(arr){
//   return arr.map(({
//     date,
//     day: {
//       avgtemp_c,
//       condition:{
//         text, 
//         icon
//       }
//     }
//   }) => `
//       <li class="weather-catd">
//           <img src="${icon}" alt="${text}" class="weather-icon"/>
//           <h2 class="date">${date}</h2>
//           <h3 class="weather-text">${text}</h3>
//           <h3 class="temperature">${avgtemp_c}</h3>
//       </li>
//   `).join("")
// }




                                                    // Урок 10.2



                                                  
// axios.defaults.header.common["x-api-key"] = "YOUR_KEY";



// Створи фільмотеку з популярними фільмами, для цього використай
// https://developer.themoviedb.org/reference/trending-movies

// Щоб отримати постер фільму потрібно підставити url
// з відповіді від бекенду та url з документації
// https://developer.themoviedb.org/docs/image-basics

// Відмалюй картки з фільмами
// Приклад картки  => https://prnt.sc/Hi_iLLg7Nd1F

// Реалізуй пагінацію
// 1 Кнопка "Load More"
// 2 Infinity scroll (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)



// *********************** Кнопка "Load More" ************************** \\


const container = document.querySelector(".js-movie-list");
const loadMore = document.querySelector(".js-load-more");
let page = 1;

// loadMore.addEventListener("click", onLoadMore)

serviceMovie()
    .then(data => {
        container.insertAdjacentHTML("beforeend", createMarkup(data.results));

        if(data.page < data.total_pages) { // data.page < 500
            loadMore.classList.replace("load-more-hidden", "load-more")
        }
    })
    .catch(error => console.log("Error!!!!", error))

function serviceMovie(page = 1) {
    const BASE_URL = "https://api.themoviedb.org/3";
    const END_POINT = "/trending/movie/week";
    const API_KEY = "345007f9ab440e5b86cef51be6397df1";

    const queryParams = new URLSearchParams({
        api_key: API_KEY,
        page: page
    })

    return fetch(`${BASE_URL}${END_POINT}?${queryParams}`)
        .then(resp => {
            if(!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
}

function createMarkup(arr) {
    return arr.map(({ poster_path, release_date, original_title, vote_average }) => `
        <li class="movie-card">
            <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
            <div class="movie-info">
                <h2>${original_title}</h2>
                <p>Release date: ${release_date}</p>
                <p>Vote average: ${vote_average}</p>
            </div>
        </li>
    `).join("")
}

function onLoadMore(){
    page += 1;

    serviceMovie(page)
        .then(data => {
            container.insertAdjacentHTML("beforeend", createMarkup(data.results))

            if(data.page >= data.total_pages){
                loadMore.classList.replace("load-more", "load-more-hidden")
            }
        })
}



// ********************************Infinity scroll ********************** \\

// const container = document.querySelector(".js-movie-list");
// const guard = document.querySelector(".js-guard");
// let page = 499;

// const options = {
//     root: null,
//     rootMargin: "300px",
//     threshold: 0
// }


// const observer = new IntersectionObserver(handlePagination, options)


// serviceMovie()
//     .then(data => {
//         container.insertAdjacentHTML("beforeend", createMarkup(data.results))

//         if(data.page < data.total_pages) {
//             observer.observe(guard)
//         }
//     })
//     .catch(error => console.log(error))

// function serviceMovie(page = 1) {
//     const BASE_URL = "https://api.themoviedb.org/3";
//     const END_POINT = "/trending/movie/week";
//     const API_KEY = "345007f9ab440e5b86cef51be6397df1";

//     const queryParams = new URLSearchParams({
//         api_key: API_KEY,
//         page: page
//     })

//     return fetch(`${BASE_URL}${END_POINT}?${queryParams}`)
//         .then(resp => {
//             if(!resp.ok) {
//                 throw new Error(resp.statusText)
//             }
//             return resp.json()
//         })
// }

// function createMarkup(arr) {
//     return arr.map(({ poster_path, release_date, original_title, vote_average }) => `
//         <li class="movie-card">
//             <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//             <div class="movie-info">
//                 <h2>${original_title}</h2>
//                 <p>Release date: ${release_date}</p>
//                 <p>Vote average: ${vote_average}</p>
//             </div>
//         </li>
//     `).join("")
// }

// function handlePagination(entries, observer) {
//     entries.forEach((entry) => {
//         console.log(entry);
//         if(entry.isIntersecting) {
//             console.log("ok");
//             page += 1;
//             serviceMovie(page)
//                 .then((data) => {
//                     container.insertAdjacentHTML("beforeend", createMarkup(data.results))

//                     if(data.page >= data.total_pages) {
//                         observer.unobserve(entry.target)
//                     }
//                 })
//                 .catch(error => console.log(error))
//         }
//     })
// }


// const selectors = {
//   button: document.querySelector("[data-start]"),
//   days: document.querySelector("[data-days]"),
//   hours: document.querySelector("[data-hours]"),
//   minutes: document.querySelector("[data-minutes]"),
//   seconds: document.querySelector("[data-seconds]"),
// }


// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//       const currentDate = new Date();

//       if(selectedDates[0] - currentDate <= 0) {
//           console.log("false");
//           selectors.button.disabled = true;
//           return;
//       } else {
//           selectors.button.disabled = false;
//       }

//       selectors.button.addEventListener("click", () => {
//           selectors.button.disabled = true;
//           const id = setInterval(() => {
//               timer(selectedDates[0], id)
//           }, 1000)
//       })
//   }
// };

// flatpickr("#datetime-picker", options);

// function timer(selectDate, id) {
//   const currentDate = new Date();
//   const deltaTime = selectDate - currentDate;

//   if(deltaTime <= 0) {
//       clearInterval(id)
//       return;
//   }

//   const days = deltaTime > 0 ? Math.floor(deltaTime / 1000 / 60 / 60 / 24) : 0;
//   const hours = deltaTime > 0 ? Math.floor(deltaTime / 1000 / 60 / 60 ) % 24 : 0;
//   const minutes = deltaTime > 0 ? Math.floor(deltaTime / 1000 / 60 ) % 60 : 0;
//   const seconds = deltaTime > 0 ? Math.floor(deltaTime / 1000 ) % 60 : 0;

//   selectors.seconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
//   selectors.minutes.textContent = minutes < 10 ? `0${minutes}` : minutes
//   selectors.hours.textContent = hours < 10 ? `0${hours}` : hours
//   selectors.days.textContent = days < 10 ? `0${days}` : days
// }