import * as myModule from '../js/script.js';
describe('App', () => {
    let sandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()

    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('#loadFavorites', () => {
        it('Should get 3 cities', async () => {
            sandbox.stub(myModule.getFavourites, 'getFavourites').returns({ "success": true, "cities": ["Аша","Москва","Челябинск"] })
            sandbox.stub(myModule.getWeatherByName, 'getWeatherByName').returns({
                "name" : arguments[0],
                "temp" : 100,
                "pressure": 100,
                "clouds" : 1,
                "humidity" : 75,
                "coord": {
                    "lon": 33.33,
                    "lat": 44.44
                },
                "wind": {
                    "speed": 2.5,
                    "deg": 330
                },
                "weather" : 1,
                "success" : true,
                "message": ""
            })
            await loadFavorites()
            assert.equal(document.getElementsByClassName('favorites-ul').length, 3)
        })
    })

    // describe('#addFavorite', () => {
    //     it('Should call server.addFavorite once', async () => {
    //         const addFavorite = sandbox.stub(server.prototype, 'addFavorite').returns([1, 2, 3])
    //
    //         sandbox.stub(server.prototype, 'getWeatherForCityName').returns({ id: 1 })
    //         sandbox.stub(App.prototype, 'createFavoriteBlock').callsArg(0)
    //
    //         const app = new App()
    //         sandbox.stub(app, 'userId').value('test_user')
    //
    //         await app.addFavorite('Moscow')
    //
    //         expect(addFavorite.callCount).to.equal(1)
    //         expect(addFavorite.calledWith('test_user', 1)).to.equal(true)
    //     })
    //
    //     it('Should fail (empty name)', async () => {
    //         const addFavorite = sandbox.stub(server.prototype, 'addFavorite')
    //
    //         sandbox.stub(server.prototype, 'getWeatherForCityName').returns({ id: 1 })
    //         sandbox.stub(App.prototype, 'createFavoriteBlock').callsArg(0)
    //         const alertStub = sandbox.stub(window, 'alert')
    //
    //         const app = new App()
    //         sandbox.stub(app, 'userId').value('test_user')
    //
    //         await app.addFavorite('')
    //
    //         expect(addFavorite.called).to.equal(false)
    //         expect(alertStub.callCount).to.equal(1)
    //         expect(alertStub.calledWith('Введите название города')).to.equal(true)
    //     })
    //
    //     it('Should fail (city not found)', async () => {
    //         const addFavorite = sandbox.stub(server.prototype, 'addFavorite')
    //
    //         sandbox.stub(server.prototype, 'getWeatherForCityName').returns({})
    //         sandbox.stub(App.prototype, 'createFavoriteBlock').callsArg(0)
    //         const alertStub = sandbox.stub(window, 'alert')
    //
    //         const app = new App()
    //         sandbox.stub(app, 'userId').value('test_user')
    //
    //         await app.addFavorite('Moscow')
    //
    //         expect(addFavorite.called).to.equal(false)
    //         expect(alertStub.callCount).to.equal(1)
    //         expect(alertStub.calledWith('Город не найден')).to.equal(true)
    //     })
    //
    //     it('Should fail (city already added)', async () => {
    //         const addFavorite = sandbox.stub(server.prototype, 'addFavorite')
    //
    //         sandbox.stub(server.prototype, 'getWeatherForCityName').returns({ id: 1 })
    //         sandbox.stub(App.prototype, 'createFavoriteBlock').callsArg(0)
    //         const alertStub = sandbox.stub(window, 'alert')
    //
    //         const app = new App()
    //         sandbox.stub(app, 'userId').value('test_user')
    //         sandbox.stub(app, 'favorites').value([ 1 ])
    //
    //         await app.addFavorite('Moscow')
    //
    //         expect(addFavorite.called).to.equal(false)
    //         expect(alertStub.callCount).to.equal(1)
    //         expect(alertStub.calledWith('Город уже добавлен')).to.equal(true)
    //     })
    // })
    //
    // describe('#removeFavorite', () => {
    //     it('Should call server.removeFavorite once', async () => {
    //         const removeFavorite = sandbox.stub(server.prototype, 'removeFavorite')
    //         sandbox.stub(App.prototype, 'removeFavoriteBlock')
    //
    //         const app = new App()
    //         sandbox.stub(app, 'userId').value('test_user')
    //
    //         await app.removeFavorite(1)
    //
    //         expect(removeFavorite.callCount).to.equal(1)
    //         expect(removeFavorite.calledWith('test_user', 1)).to.equal(true)
    //     })
    // })
})