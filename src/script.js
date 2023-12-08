//Урок 10.1

// *********Links********* \\
// https://www.postman.com/downloads/
// https://rickandmortyapi.com/documentation
// https://www.weatherapi.com/docs/




//Fetch

// fetch("https://rickandmortyapi.com/api/character")
//       .then(response => console.log("then",response))
//       .catch(err => console.log("catch", err))
      

fetch("https://rickandmortyapi.com/api/character")
      .then(data => {
        if(!data.ok){
            throw new Error("")
        }
      })
      .catch(err => console.log("catch", err))
