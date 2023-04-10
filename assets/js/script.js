newDigimon();

//Funcion del Nabvbar, seleccion de Niveles
$(document).ready(function () {
    $("#levelAll").click(function () {
        $("#lista").empty();
        newDigimon();
    });

    $("#levelInTraining").click(function () {
        $("#lista").empty();
        digimonLevel("In Training");
    });

    $("#levelRookie").click(() => {
        $("#lista").empty();
        digimonLevel("Rookie");
    });

    $("#levelChampion").click(() => {
        $("#lista").empty();
        digimonLevel("Champion");
    });

    $("#levelUltimate").click(() => {
        $("#lista").empty();
        digimonLevel("Ultimate");
    });

    $("#levelMega").click(() => {
        $("#lista").empty();
        digimonLevel("Mega");
    });

    //No loger hacer que busque con un simple enter en la busqueda con JQuery.
    $("#buscar").click(() => {
        $("#lista").empty();
        let buscar = $("#busqueda").val();
        digimonNombre(buscar);
    });
});

function moreInfo() {
    $("#myModal").modal("show");
    $("#name").text(event.target.alt);
    $("#img-poster").attr("src", event.target.src);
    $("#description").text("");
    digimonMore(event.target.alt);
}
    

//Funcion que crea la pagina con todos los digimones. Me habria gustado hacer un fetch y guardar la
//lista completa, pero no lo logre, por lo que para cacda funcion que manipule los digimones
//habra que hacer un nuevo fetch
function newDigimon() {
    fetch("https://digimon-api.vercel.app/api/digimon")
        .then((response) => response.json())
        .then((digimon) => {
            for (let i in digimon) {
                generarDigimon(digimon, i);
            }
        });
}

//Funcion que selecciona el Nivel
function digimonLevel(digiLevel) {
    fetch("https://digimon-api.vercel.app/api/digimon")
        .then((response) => response.json())
        .then((digimon) => {
            for (let i in digimon) {
                if (digiLevel == digimon[i].level) {
                    generarDigimon(digimon, i);
                }
            }
        });
}

//Funcion de busqueda segun un string ingresado. Automaticamente lo pone todo en lower case para facilitar las busquedas.
//Busca por fragmentos del nombre.
function digimonNombre(digiName) {
    fetch("https://digimon-api.vercel.app/api/digimon")
        .then((response) => response.json())
        .then((digimon) => {
            digiName = digiName.toLowerCase();
            for (let i in digimon) {
                let buscar = JSON.stringify(digimon[i].name).toLowerCase();
                if (buscar.search(digiName) != -1) {
                    generarDigimon(digimon, i);
                }
            }
        });
}

//Funcion que genera el HTML Digimon segun parametros
function generarDigimon(digimon, i) {
    const newNode = document.createElement("div");
    newNode.setAttribute("id", `digimon-${i}`);
    newNode.setAttribute("class", "digimon");
    const nombre = document.createElement("p");
    nombre.innerText = digimon[i].name;
    nombre.setAttribute("class", "nombre");
    const imagen = document.createElement("img");
    imagen.setAttribute("src", digimon[i].img);
    imagen.setAttribute("id", `digimon-${i}`);
    imagen.setAttribute("onClick", "moreInfo()");
    imagen.setAttribute("alt", digimon[i].name);
    imagen.setAttribute("class", "imagen");
    const level = document.createElement("p");
    level.innerText = digimon[i].level;
    level.setAttribute("class", "level");
    newNode.appendChild(nombre);
    newNode.appendChild(imagen);
    newNode.appendChild(level);
    document.querySelector("#lista").appendChild(newNode);
}

//Intenta encontrar mas info del Digimon. Try catch en caso de que no encuentre nada.
function digimonMore(name) {
    let dir = "https://www.digi-api.com/api/v1/digimon?name=" + name;
    fetch(dir)
        .then((response) => response.json())
        .then((digimon) => {
            try {
                if (digimon.content[0].href == "") throw empty;
                let href = digimon.content[0].href;

                fetch(href)
                    .then((response) => response.json())
                    .then((digimon) => {
                        for (let i in digimon.descriptions) {
                            if (digimon.descriptions[i].language == "en_us") {
                                $("#description").text(
                                    digimon.descriptions[i].description
                                );
                            }
                        }
                    });
            } catch (err) {}
        });
}
