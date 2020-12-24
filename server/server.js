const port = 8080
const host = 'localhost'

const apiKey = 'a98bacd5e04d94e1bbd3afd506d56bb2';
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&';

const Datastore = require('nedb');
let db = new Datastore({filename: 'server/database.db', autoload: true});

const express = require('express');
const cors = require('cors');
const token = require('rand-token');
const cookieParser = require('cookie-parser')
const fetch = require("node-fetch");
const clientLink = process.env.CLIENT_LINK;

const app = express();

const corsOptions = {
    origin: 'http://localhost:63342',
    credentials: true,
    methods: 'GET, POST, DELETE, OPTIONS',
    headers: 'Origin, X-Requested-With, Content-Type, Accept',
    httpOnly: true
}

app.options(cors(corsOptions))
app.use(cookieParser())
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:63342')
    response.header('Access-Control-Allow-Credentials', true)
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    if (request.method === 'OPTIONS') {
        response.send(200);
    }
    else {
        next()
    }
})

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: false,
    // secure: true
}

app.get('/weather/city', cors(corsOptions), function (req, res) {
    const q = req.query.q
    if (typeof q !== 'string') {
        res.status(422).end()
        return
    }
    console.log("GET /weather/city = " + q);
    getWeatherByName(encodeURI(q)).then(r => res.json(r));
})

app.get('/weather/coordinates', cors(corsOptions), function (req, res) {
    const lat = req.query.lat
    const lon = req.query.lon
    if (typeof lat !== 'string' || typeof lon !== 'string') {
        res.status(422).end()
        return
    }
    console.log("GET /weather/coordinates = " + lat + " " + lon);
    getWeatherByCoord(lat, lon).then(r => res.json(r));
})
app.get('/favourites', cors(corsOptions), function (req, res) {
    let userKey = req.cookies.userKey

    db.find({ "userToken": userKey }, function(error, docs) {
        if (error != null) {
            res.json({ "success": false, "message": error })
        }
        else if (docs.length === 0) {
            res.json({ "success": true, "cities": []})
        }
        else {
            res.cookie( "userKey",  userKey, cookieOptions)
            res.json({ "success": true, "cities": docs[0].cities })
        }
    })
})

app.post('/favourites/:city', cors(corsOptions), async (req, res) => {
    let city = req.params.city
    if (typeof city !== 'string') {
        res.status(422).end()
        return
    }
    city = encodeURI(city)
    const weather = await getWeatherByName(city)
    let userKey = req.cookies.userKey
    if(typeof(userKey) == 'undefined') {
        userKey = token.generate(16)
    }
    if(weather.success) {
        db.find({ "userToken": userKey, "cities": { $elemMatch: weather.name } }, function(err, docs) {
            if (err != null) {
                res.json({ "success": false, "message": err })
            }
            else if(docs.length !== 0) {
                res.cookie("userKey", userKey, cookieOptions).json({ "success": true, "message": true })
            }
            else {
                db.update({ "userToken": userKey }, { $addToSet: { "cities": weather.name } }, { "upsert": true }, function() {
                    if (err != null) {
                        res.json({ "success": false, "message": err })
                    }
                    else {
                        res.cookie("userKey", userKey, cookieOptions)
                        res.json(weather)
                    }
                })
            }
        })
    }
    else {
        res.json(weather)
    }
})

app.delete('/favourites/:city', cors(corsOptions), (req, res) => {
    let userKey = req.cookies.userKey
    const city = req.params.city
    if (typeof city !== 'string') {
        res.status(422).end()
        return
    }
    if (!userKey) {
        res.json({ "success": false, "message": 'User undefined' })
    }
    else {
        db.find({ "userToken": userKey, "cities": { $elemMatch : city } }, function(error, docs) {
            if(error != null) {
                res.json({ "success": false, "message": error })
            }
            else if(docs.length === 0) {
                res.json({ success: false, message: "City is not in the Database" })
            }
            else {
                db.update({ "userToken": userKey }, { $pull: { "cities": city } }, function(error, numAffected, affectedDocuments, upsert) {
                    if(error != null) {
                        res.json({ "success": false, "message": error })
                    }
                    else {
                        res.cookie('userKey', userKey, cookieOptions)
                        res.json({ "success": true })
                    }
                })
            }
        })
    }
})

let server;
server = app.listen(port, host);

async function getWeather(url){
    let response = await fetch(url);
    let data
    if (response.ok) {
        data = await response.json()
    } else {
        data = null
    }
    return createAnswer(data)
}
function getWeatherByName(cityName){
    let requestURL = apiLink + 'q=' + cityName + '&appid=' + apiKey;
    return getWeather(requestURL);
}

function getWeatherByCoord(lat, lon){
    let requestURL = apiLink + '&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    return getWeather(requestURL);
}
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
        "weather" : data.weather[0].id,
        "success" : true,
        "message": ""
    }
    else return {"success" : false, "message" : "API не отвечает, скорее всего город не существует"}
}
module.exports = {db, app, getWeatherByName, getWeather, getWeatherByCoord};