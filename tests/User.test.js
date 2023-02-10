const User = require('../src/User')

// User tests here
describe('user', () => {
    const user = new User("mia", "jimenez", 21)

    test('instance has correct properties', () => {
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("age");
        expect(user).toHaveProperty("loggedIn", false);
    })

})

describe('test user methods', () => {
    const user = new User("mia", "123", 21)
    // test login
    test('user is logged in', () => {
        expect(user.password).toBe("123");
    })

    // test logout
    test('user is logged out', () => {
        expect(user.loggedIn).toBe(false);
    })
})


