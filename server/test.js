const server = require('./server');
const sinon = require('sinon')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const fetchMock = require("jest-fetch-mock")
fetchMock.enableMocks();
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

fetch.mockResponse(JSON.stringify(sampleResponse));
beforeEach(async () => {
    await sinon.stub(server, 'getWeather').returns(sampleResponse);
    await sinon.stub(server, 'getWeatherByName').returns(sampleResponse);
    await sinon.stub(server, 'getWeatherByCoord').returns(sampleResponse);
});

afterEach(() => {
    server.getWeather.restore();
    server.getWeatherByName.restore();
    server.getWeatherByCoord.restore();
});


test("test stub", () => {
    let req = server.getWeather("Moscow")
    expect(req).toEqual(sampleResponse)
});

test("Should return 200 (city)", (done) => {
            request(server.app)
                .get('/weather/city?q=Moscow')
                .end((err, res) => {
                    expect(res.status).toEqual(200)
                    done()
                })
});

test('Should return 422 (missing query)', (done) => {
    request(server.app)
        .get('/weather/city')
        .end((err, res) => {
            expect(res.status).toEqual(422)
            done()
        })
});

test("Should return 200 (coordinates)", (done) => {
    request(server.app)
        .get('/weather/coordinates?lat=33.33&lon=34.34')
        .end((err, res) => {
            expect(res.status).toEqual(200)
            chai.expect(res).to.be.json
            done()
        })
});
test("Should return 422 (missing lat)", (done) => {
    request(server.app)
        .get('/weather/coordinates?lon=34.34')
        .end((err, res) => {
            expect(res.status).toEqual(422)
            done()
        })
});
test("Should return 422 (missing lon)", (done) => {
    request(server.app)
        .get('/weather/coordinates?lat=33.33')
        .end((err, res) => {
            expect(res.status).toEqual(422)
            done()
        })
});

test("Should return []", (done) => {
    request(server.app)
        .get('/favourites')
        .end((err, res) => {
            expect(res.status).toEqual(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.property('success', true)
            done()
        })
});
test("Should return 200 (add)", (done) => {
    request(server.app)
        .post('/favourites/Moscow')
        .end((err, res) => {
            expect(res.status).toEqual(200)
            chai.expect(res).to.be.json
            chai.expect(res.body).to.have.property('success', true)
            done()
        })
});
test("Should return 404 (missing param)", (done) => {
    request(server.app)
        .post('/favourites/')
        .end((err, res) => {
            expect(res.status).toEqual(404)
            done()
        })
});

test("Should return 404 (missing param)", (done) => {
    request(server.app)
        .delete('/favourites')
        .end((err, res) => {
            expect(res.status).toEqual(404)
            done()
        })
});

test("Should return 200 (delete)", (done) => {
    request(server.app).post('/favourites/Moscow').end()
    request(server.app)
        .delete('/favourites/Moscow')
        .end((err, res) => {
            expect(res.status).toEqual(200)
            chai.expect(res).to.be.json
            done()
        })
});

