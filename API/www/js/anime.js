$(document).ready(function () {
    $("#search-btn").on("click", function () {
        const query = $("#search-query").val(); 
        const type = $("#search-type").val();

        if (type == "anime") {
            obtenerListaAnime(query);
        } else if (type == "manga") {
            obtenerListaManga(query);
        } else if (type == "character") {
            obtenerListaPersonajes(query);
        }
    });
});

// Función para obtener la lista de animes
function obtenerListaAnime(query) {
    const graphqlQuery = `
    query($search: String) {
        Page(perPage: 20) {
            media(search: $search, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
            }
        }
    }`;

    const variables = { search: query };

    $.ajax({
        method: "POST",
        url: "https://graphql.anilist.co", 
        contentType: "application/json", 
        data: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        }),
        dataType: "json",
    })  
    .done(function (response) {
        const animeList = response.data.Page.media;
        const animetrobat = $("#llista");
        animetrobat.empty();
        if (animeList.length > 0) {
            for (let i = 0; i < animeList.length; i++) {
                const newElem = $(`<li><a href="#!" class="collection-item" id="${animeList[i].title.romaji}">${animeList[i].title.romaji}</a></li>`);
                animetrobat.append(newElem);
            }

            $("#llista a").on("click", function(event) {
                event.preventDefault();
                var name = this.id;
                buscarAnime(name);
            });
        } else {
            animetrobat.html("<p>No existeix</p>");
        }
    })
    .fail(function () {
        alert("ERROR: Unable to fetch data from AniList.");
    });
}

// Función para obtener la lista de mangas
function obtenerListaManga(query) {
    const graphqlQuery = `
    query($search: String) {
        Page(perPage: 20) {
            media(search: $search, type: MANGA) {
                id
                title {
                    romaji
                    english
                    native
                }
            }
        }
    }`;

    const variables = { search: query };

    $.ajax({
        method: "POST",
        url: "https://graphql.anilist.co", 
        contentType: "application/json", 
        data: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        }),
        dataType: "json",
    })  
    .done(function (response) {
        const mangaList = response.data.Page.media;
        const mangatrobat = $("#llista");
        mangatrobat.empty();
        if (mangaList.length > 0) {
            for (let i = 0; i < mangaList.length; i++) {
                const newElem = $(`<li><a href="#!" class="collection-item" id="${mangaList[i].title.romaji}">${mangaList[i].title.romaji}</a></li>`);
                mangatrobat.append(newElem);
            }

            $("#llista a").on("click", function(event) {
                event.preventDefault();
                var name = this.id;
                buscarManga(name);
            });
        } else {
            mangatrobat.html("<p>No existeix</p>");
        }
    })
    .fail(function () {
        alert("ERROR: Unable to fetch data from AniList.");
    });
}

// Función para obtener la lista de personajes
function obtenerListaPersonajes(query) {
    const graphqlQuery = `
    query($search: String) {
        Page(perPage: 20) {
            characters(search: $search) {
                id
                name {
                    full
                    native
                }
                image {
                    medium
                }
            }
        }
    }`;

    const variables = { search: query };

    $.ajax({
        method: "POST",
        url: "https://graphql.anilist.co", 
        contentType: "application/json", 
        data: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        }),
        dataType: "json",
    })  
    .done(function (response) {
        const characterList = response.data.Page.characters;
        const characterListContainer = $("#llista");
        characterListContainer.empty();
        if (characterList.length > 0) {
            for (let i = 0; i < characterList.length; i++) {
                const newElem = $(`<li><a href="#!" class="collection-item" id="${characterList[i].name.full}">${characterList[i].name.full}</a></li>`);
                characterListContainer.append(newElem);
            }

            $("#llista a").on("click", function(event) {
                event.preventDefault();
                var name = this.id;
                buscarPersonaje(name);
            });
        } else {
            characterListContainer.html("<p>No existeix</p>");
        }
    })
    .fail(function () {
        alert("ERROR: Unable to fetch data from AniList.");
    });
}

// Función para obtener detalles de un anime
function buscarAnime(query) {
    const graphqlQuery = `
    query ($search: String) {
        Media(search: $search, type: ANIME) {
            id
            title {
                romaji
                english
                native
            }
            description
            episodes
            status
            averageScore
            genres
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }`;

    const variables = { search: query };

    $.ajax({
        method: "POST",
        url: "https://graphql.anilist.co",
        contentType: "application/json",
        data: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        }),
        dataType: "json",
    })
    .done(function (response) {
        const anime = response.data.Media;
        if (anime) {
            const imageUrl = anime.coverImage.large;
            const animedata = $("#info");
            animedata.html(`
                <h3 id="titol">${anime.title.romaji}</h3>
                <img src="${imageUrl}" id="animeimg"/>
                <p id="epi">Episodis: ${anime.episodes}</p>
                <p id="nota">Puntuació: ${anime.averageScore}</p>
                <ul id="generes-lista"><li id="genere-item">Gèneres: ${anime.genres.join(", ")}</li></ul>
                <p id="sinopsi">Sinopsi: ${anime.description}</p>
            `);
        } else {
            console.log("No s'han trobat resultats.");
        }
    })
    .fail(function () {
        alert("ERROR: No s'ha pogut obtenir dades d'AniList.");
    });
}

function buscarManga(query) {
const graphqlQuery = `
    query ($search: String) {
        Media(search: $search, type: MANGA) {
            id
            title {
                romaji
                english
                native
            }
            description
            chapters
            volumes
            status
            averageScore
            genres
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }`;

    const variables = { search: query };

    $.ajax({
        method: "POST",
        url: "https://graphql.anilist.co",
        contentType: "application/json",
        data: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        }),
        dataType: "json",
    })
    .done(function (response) {
        const manga = response.data.Media;
        if (manga) {
            const imageUrl = manga.coverImage.large;
            const mangadata = $("#info");
            mangadata.html(`
                <h3 id="titol">${manga.title.romaji}</h3>
                <img src="${imageUrl}" id="mangaimg"/>
                <p id="epi">Capitols: ${manga.chapters}</p>
                <p id="status"> Estatus: ${manga.status}</p>
                <p id="nota">Puntuació: ${manga.averageScore}</p>
                <ul id="generes-lista"><li id="genere-item">Gèneres: ${manga.genres.join(", ")}</li></ul>
                <p id="sinopsi">Sinopsi: ${manga.description}</p>
            `);
        } else {
            console.log("No s'han trobat resultats.");
        }
    })
    .fail(function () {
        alert("ERROR: No s'ha pogut obtenir dades d'AniList.");
    });
}

function buscarPersonaje(query) {
    const graphqlQuery = `
    query ($search: String) {
        Character(search: $search) {
            id
            name {
                full
                native
            }
            image {
                large
                medium
            }
            description
            gender
            dateOfBirth {
                year
                month
                day
            }
            age
        }
    }`;

    const variables = { search: query };

    $.ajax({
        method: "POST",
        url: "https://graphql.anilist.co",
        contentType: "application/json",
        data: JSON.stringify({
            query: graphqlQuery,
            variables: variables,
        }),
        dataType: "json",
    })
    .done(function (response) {
        const character = response.data.Character;
        if (character) {
            const imageUrl = character.image.large;
            const birthDate = character.dateOfBirth.day && character.dateOfBirth.month
                ? `${character.dateOfBirth.day}/${character.dateOfBirth.month}/${character.dateOfBirth.year || "Desconegut"}`
                : "Desconegut";
            
            const cleanDescription = character.description
                ? character.description.replace(/__|[*]/g,"").replace(/\n/g, "<br>").replace(/~!/g, "SPOILER:").replace(/!~/g,"")
                : "No hi ha informació disponible.";

            const characterdata = $("#info");
            characterdata.html(`
                <h3 id="titol">${character.name.full} (${character.name.native})</h3>
                <img src="${imageUrl}" id="character-img"/>
                <p id="gender"><strong>Gènere:</strong> ${character.gender || "Desconegut"}</p>
                <p id="date"><strong>Data de naixement:</strong> ${birthDate}</p>
                <p id="age"><strong>Edat:</strong> ${character.age || "Desconeguda"}</p>
                <p id="sinopsi">${cleanDescription}</p>
            `);
        } else {
            console.log("No s'han trobat resultats.");
        }
    })
    .fail(function () {
        alert("ERROR: No s'ha pogut obtenir dades d'AniList.");
    });
}


document.addEventListener('DOMContentLoaded', function() {
    var selects = document.querySelectorAll('select');
    var instancesSelect = M.FormSelect.init(selects);
});
