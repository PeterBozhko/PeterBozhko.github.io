const server = require('./server');
const sinon = require('sinon')
const chai = require('chai')
const chaiHttp = require('chai-http')
const {json} = require("mocha");
chai.use(chaiHttp);
const { request } = chai
const sampleResponse = {
    "coord": {
        "lon": -122.08,
        "lat": 37.39
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 282.55,
        "feels_like": 281.86,
        "temp_min": 280.37,
        "temp_max": 284.26,
        "pressure": 1023,
        "humidity": 100
    },
    "visibility": 16093,
    "wind": {
        "speed": 1.5,
        "deg": 350
    },
    "clouds": {
        "all": 1
    },
    "dt": 1560350645,
    "sys": {
        "type": 1,
        "id": 5122,
        "message": 0.0139,
        "country": "US",
        "sunrise": 1560343627,
        "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
};


////Sinon //////////////////////////////////////////////////

beforeEach(() => {
    let stub = sinon.stub(server, 'getWeather').returns(sampleResponse);
});

afterEach(() => {
    server.getWeather.restore();  //remove stub
});
/////////////////////////////////////////////////


test("test1", () => {

    let s = sinon.stub(server, "getWeatherByName").returns({ id: 0})
    expect(server.getWeatherByName("Moskow")).toEqual({ id: 0})
    s.restore()
});
test("test2", () => {
    let req = server.getWeather("Moskow")
    expect(req).toEqual(sampleResponse)
});

test("Should return 200", () => {
            request(server.app)
                .get('/weather/city?q=Moscow')
                .end((err, res) => {
                    expect(res.status).toEqual(200)
                    expect(res.text).toEqual(sampleResponse)
                })
});

test('Should return 422 (missing query)', () => {
    request(server.app)
        .get('/weather/city')
        .end((err, res) => {
            expect(res.status).toEqual(422)
        })
});

test("Should return 200", () => {
    request(server.app)
        .get('/weather/coordinates?lat=33.33&lon=34.34')
        .end((err, res) => {
            expect(res.status).toEqual(200)
            expect(res).toEqual(sampleResponse)
        })
});
test("Should return 422 (missing lat)", () => {
    request(server.app)
        .get('/weather/coordinates?lon=34.34')
        .end((err, res) => {
            expect(res.status).toEqual(422)
        })
});
test("Should return 422 (missing lon)", () => {
    request(server.app)
        .get('/weather/coordinates?lat=33.33')
        .end((err, res) => {
            expect(res.status).toEqual(422)
        })
});

// test("Should return []", () => {
//     request(server.app)
//         .get('/favourites')
//         .end((err, res) => {
//             expect(res.status).toEqual(200)
//             expect(res).toEqual({ "success": true, "cities": []})
//         })
// });
//
// test("Should return cityName", () => {
//     request(server.app).post('/favourites/:cityName')
//     request(server.app)
//         .get('/favourites')
//         .end((err, res) => {
//             expect(res.status).toEqual(200)
//             expect(res).toEqual({ "success": true, "cities": []})
//         })
// });

