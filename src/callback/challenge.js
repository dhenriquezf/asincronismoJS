//objeto dentro de JS para hacer peticiones a servicios (o archivos y ftp)
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    //si este cambio sucede (onreadystatechange) se ejecuta la funcion
    xhttp.onreadystatechange = function (event) {
        //aqui veremos si el estado de la consulta es satisfactorio
        //4 es OK
        if (xhttp.readyState === 4) {
            // 200 es OK
            if (xhttp.status === 200) {
                //se manda null el error y se parsea la respuesta que es de texto string y no se podria iterar.
                callback(null, JSON.parse(xhttp.responseText));
            }else{
                const error = new Error('Error' + url_api);
                return callback(error, null)
            }
        }
    }

    xhttp.send();
}

fetchData(API, function(error1, data1) {
    if (error1) return console.log(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){
        if (error2) return console.log(error2);
        fetchData(data2.origin.url, function (error3, data3) {
            if (error3) return console.log(error3)
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        })
    })
});

