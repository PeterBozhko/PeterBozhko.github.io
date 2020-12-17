const port = 8080
const host = 'localhost'

const apiKey = 'a98bacd5e04d94e1bbd3afd506d56bb2';
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';

async function getWeather(url){
    let response = await fetch(url);
    if (response.ok) {
        return await response.json()
    } else {
        return null
    }
}
function getWeatherByName(cityName){
    let requestURL = apiLink + 'q=' + cityName + '&appid=' + apiKey;
    return getWeather(requestURL);
}

function getWeatherByCoord(lat, lon){
    let requestURL = apiLink + '&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    return getWeather(requestURL);
}

// const data = {
//     "coord": {
//         "lon": -122.08,
//         "lat": 37.39
//     },
//     "weather": [
//         {
//             "id": 800,
//             "main": "Clear",
//             "description": "clear sky",
//             "icon": "01d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 282.55,
//         "feels_like": 281.86,
//         "temp_min": 280.37,
//         "temp_max": 284.26,
//         "pressure": 1023,
//         "humidity": 100
//     },
//     "visibility": 16093,
//     "wind": {
//         "speed": 1.5,
//         "deg": 350
//     },
//     "clouds": {
//         "all": 1
//     },
//     "dt": 1560350645,
//     "sys": {
//         "type": 1,
//         "id": 5122,
//         "message": 0.0139,
//         "country": "US",
//         "sunrise": 1560343627,
//         "sunset": 1560396563
//     },
//     "timezone": -25200,
//     "id": 420006353,
//     "name": "Mountain View",
//     "cod": 200
// };

const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const express = require('express');
const cors = require('cors')
const app = express();

const corsOptions = {
    // origin:
    credentials: true,
    methods: ['GET', 'PUT', 'POST'],
    headers: 'Origin, X-Requested-With, Content-Type, Accept'
}
app.options(cors(corsOptions))

function createAnswer(data) {
    if (data !== null)  return {
        "name" : data.name,
        "temp" : data.main.temp,
        "pressure": data.main.pressure,
        "clouds" : data.clouds.all,
        "humidity" : data.main.humidity,
        "coord": {
            "lon": data.coord.lon,
            "lat": data.coord.lat
        },
        "wind": {
            "speed": data.wind.speed,
            "deg": data.wind.deg
        },
        "weather-id" : data.weather[0].id,
        "success" : true
    }
    else return {"success" : false}
}

app.get('/weather/city', cors(corsOptions), function (req, res) {
    console.log("GET /weather/city = " + req.query.q);
    res.json(createAnswer(getWeatherByName(req.query.q)));
})

app.get('/weather/coordinates', cors(corsOptions), function (req, res) {
    console.log("GET /weather/coordinates = " + req.query.lat + " " + req.query.lon);
    res.json(createAnswer(getWeatherByCoord(req.query.lat, req.query.lon)));
})
app.get('/favourites', cors(corsOptions), function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})
app.post('/favourites', cors(corsOptions), function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})
app.delete('/favourites', cors(corsOptions), function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

let server;
server = app.listen(port, host, function () {
    console.log("Server started at http://%s:%s", host, port)
});





// http.createServer((request, response) => {
//     console.log('server work');
//     console.log(request.method);
//     if (request.method === 'GET') {
//         let urlRequest = url.parse(request.url, true);
//         console.log(urlRequest)
//         // console.log(JSON.parse(data))
//         response.statusCode = 201
//         response.json(data)
//         //
//         // // console.log(urlRequest);
//         console.log(urlRequest.query.q); // ! GET Params
//         // if (urlRequest.query.q !== "") {
//         //     let res = getWeatherByName(urlRequest.query.q)
//         //     response.end(res);
//         // }
//         // response.end('odd');
//     }
//     else {
//         // POST
//         let body = '';
//         request.on('data', chunk => {
//             body += chunk.toString();
//         });
//         request.on('end', () => {
//             console.log(body);
//             let params = parse(body);
//             console.log(params);
//             response.end('ok');
//         });
//     }
//
// }).listen(port, host, () => console.log('Server is on'));
