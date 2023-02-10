const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here
describe('ScooterApp', () => {
    const scooterApp = new ScooterApp();

    test('instance has correct properties', () => {
        expect(scooterApp).toHaveProperty("stations", {});
        expect(scooterApp).toHaveProperty("registeredUsers", {});
    })
})

describe('scooter app methods', () => {
    const scooterApp = new ScooterApp()

    // register user
    


    // log in
    


    // log out
    


    // rent scooter
    test('should locate scooter at a station and remove it', () => {
        const scooter = new Scooter("station")
    })

    test('should rent it to the user', () => {

    })

    test('should throw an error if it is already rented', () => {

    })


    // dock scooter
    
      

})

