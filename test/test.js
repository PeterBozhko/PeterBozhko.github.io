// require('../server/server')
//
// const { describe, it } = mocha
// const { stub, fake } = sinon
// const { request, expect } = chai
//
//
// describe('/weather', () => {
//     const sampleResponse = {
//             "coord": {
//                 "lon": -122.08,
//                 "lat": 37.39
//             },
//             "weather": [
//                 {
//                     "id": 800,
//                     "main": "Clear",
//                     "description": "clear sky",
//                     "icon": "01d"
//                 }
//             ],
//             "base": "stations",
//             "main": {
//                 "temp": 282.55,
//                 "feels_like": 281.86,
//                 "temp_min": 280.37,
//                 "temp_max": 284.26,
//                 "pressure": 1023,
//                 "humidity": 100
//             },
//             "visibility": 16093,
//             "wind": {
//                 "speed": 1.5,
//                 "deg": 350
//             },
//             "clouds": {
//                 "all": 1
//             },
//             "dt": 1560350645,
//             "sys": {
//                 "type": 1,
//                 "id": 5122,
//                 "message": 0.0139,
//                 "country": "US",
//                 "sunrise": 1560343627,
//                 "sunset": 1560396563
//             },
//             "timezone": -25200,
//             "id": 420006353,
//             "name": "Mountain View",
//             "cod": 200
//         };
//     stub(this, 'getWeather').returns(sampleResponse)
//
//     describe('GET /weather/city', () => {
//         it('Should return 200', (done) => {
//             request(app)
//                 .get('/weather/city?q=Moscow')
//                 .end((err, res) => {
//                     expect(res).to.have.status(200)
//                     expect(res).to.be.json
//                     expect(res.body).to.not.be.empty
//
//                     done()
//                 })
//         })
//
//         it('Should return 422 (missing q)', (done) => {
//             request(app)
//                 .get('/weather/city')
//                 .end((err, res) => {
//                     expect(res).to.have.status(422)
//                     done()
//                 })
//         })
//     })
// //
// //     describe('GET /weather/coords', () => {
// //         it('Should return 200', (done) => {
// //             request(app)
// //                 .get('/weather/coords?lat=30&lon=20')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(200)
// //                     expect(res).to.be.json
// //                     expect(res.body).to.not.be.empty
// //
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (missing lon)', (done) => {
// //             request(app)
// //                 .get('/weather/coords?lat=30')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (missing lat)', (done) => {
// //             request(app)
// //                 .get('/weather/coords?lon=20')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (missing lat & lon)', (done) => {
// //             request(app)
// //                 .get('/weather/coords')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //     })
// //
// //     describe('GET /weather/id', () => {
// //         it('Should return 200', (done) => {
// //             request(app)
// //                 .get('/weather/id?id=0')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(200)
// //                     expect(res).to.be.json
// //                     expect(res.body).to.not.be.empty
// //
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (missing id)', (done) => {
// //             request(app)
// //                 .get('/weather/id')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //     })
// // })
// //
// // describe('/register', () => {
// //     describe('GET /register', () => {
// //         it('Should return 200', (done) => {
// //             request(app)
// //                 .get('/register')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(200)
// //                     expect(res.body).to.not.be.empty
// //
// //                     done()
// //                 })
// //         })
// //     })
// // })
// //
// // describe('/favorites', () => {
// //     const sampleFavorites = [1, 3, 5]
// //     const prepare = stub(sqlite3.Database.prototype, 'prepare')
// //
// //     prepare.onCall(0).returns({
// //         all: (args, cb) => cb(undefined, sampleFavorites.map(f => ({ city_id: f }))),
// //         finalize: fake()
// //     })
// //
// //     prepare.onCall(1).returns({
// //         run: (args, cb) => cb(undefined),
// //         finalize: fake()
// //     })
// //
// //     prepare.onCall(2).returns({
// //         run: (args, cb) => cb(undefined),
// //         finalize: fake()
// //     })
// //
// //     describe('GET /favorites', () => {
// //         it('Should return 200', (done) => {
// //             request(app)
// //                 .get('/favorites?user=0')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(200)
// //                     expect(res.body).to.not.be.empty
// //
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422', (done) => {
// //             request(app)
// //                 .get('/favorites')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //     })
// //
// //     describe('POST /favorites', () => {
// //         it('Should return 200', (done) => {
// //             request(app)
// //                 .post('/favorites')
// //                 .send({ user: '0', city: 1 })
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(200)
// //                     expect(res.body).to.have.property('success', true)
// //
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (no body)', (done) => {
// //             request(app)
// //                 .post('/favorites')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (empty object)', (done) => {
// //             request(app)
// //                 .post('/favorites')
// //                 .send({})
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //     })
// //
// //     describe('DELETE /favorites', () => {
// //         it('Should return 200', (done) => {
// //             request(app)
// //                 .delete('/favorites')
// //                 .send({ user: '0', city: 1 })
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(200)
// //                     expect(res.body).to.have.property('success', true)
// //
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (no body)', (done) => {
// //             request(app)
// //                 .delete('/favorites')
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //
// //         it('Should return 422 (empty object)', (done) => {
// //             request(app)
// //                 .delete('/favorites')
// //                 .send({})
// //                 .end((err, res) => {
// //                     expect(res).to.have.status(422)
// //                     done()
// //                 })
// //         })
// //     })
// })