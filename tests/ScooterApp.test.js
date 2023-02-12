const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here
describe('ScooterApp', () => {
    const scooterApp = new ScooterApp();

    test('instance has correct properties', () => {
        expect(scooterApp).toHaveProperty("stations", {"Kensington": [],
        "West Hampstead": [],
        "Camden": [],
        "Angel": [],
        "Enfield": [],
        "Shepherds Bush": [],
        "Greenwich": []});
        expect(scooterApp).toHaveProperty("registeredUsers", {});
    })
})

describe('scooter app methods', () => {
    const scooterApp = new ScooterApp()
    const scooter = new Scooter("station")

    // register user
    test("register a new user", () => {
        scooterApp.registerUser('user1', 'password1', 21);
        expect(scooterApp.registeredUsers).toHaveProperty('user1');
      });
      
    test("try to register an already registered user", () => {
        const username = "testuser";
        const password = "newpassword";
        const age = 20;
        scooterApp.registeredUsers = {"testuser": 1}
      
        expect(() => {
          scooterApp.registerUser(username, password, age);
        }).toThrow("already registered");
    });
      
    test("try to register a user under 18", () => {
        const username = "younguser";
        const password = "youngpassword";
        const age = 17;
      
        expect(() => {
          scooterApp.registerUser(username, password, age);
        }).toThrow("too young to register");
    });


    // log in
    test('should log in an existing user', () => {
        scooterApp.registerUser('john', 'password123', 22);
        scooterApp.loginUser('john', 'password123');
        expect(scooterApp.registeredUsers['john']).toHaveProperty('loggedIn', true);
    });
      
    test('should throw an error if the username is not found', () => {
        expect(() => scooterApp.loginUser('incorrectUsername', 'password123'))
          .toThrow('Username or password is incorrect');
    });
      
    test('should throw an error if the password is incorrect', () => {
        expect(() => scooterApp.loginUser('john', 'incorrectPassword'))
          .toThrow('Username or password is incorrect');
    });
      
    // log out
    test('it should log out a logged-in user', () => {
        scooterApp.registerUser('john', 'password123', 22);
        const user = scooterApp.loginUser('john', 'password123');
        scooterApp.logoutUser('john');
        expect(scooterApp.registeredUsers['john']).toHaveProperty('loggedIn', false);
    });
    
    test('it should throw an error if the user is not logged in', () => {
        expect(() => scooterApp.logoutUser('john'))
            .toThrow('No such user is logged in');
    });


    // rent scooter
    test("should rent the scooter to the user", () => {
        const user1 = scooterApp.registerUser("user1", "password", 22);
        scooterApp.loginUser("user1", "password");
        scooterApp.rentScooter(scooter1, user1);
        expect(scooter1.station).toBe(null);
        expect(scooter1.user).toBe(user1);
        expect(user1.scooter).toBe(scooter1);
    });
  
    test("should throw error if scooter is already rented", () => {
        const user1 = scooterApp.registerUser("user1", "password", 22);
        scooterApp.loginUser("user1", "password");
        scooterApp.rentScooter(scooter1, user1);
        expect(() => {
          scooterApp.rentScooter(scooter1, user1);
        }).toThrowError("Scooter already rented");
    });


    // create scooter
    test("creates a new scooter and adds it to the station", () => {
        const scooter = scooterApp.createScooter("Enfield");
        expect(scooter).toBeInstanceOf(Scooter);
        expect(scooterApp.stations["Enfield"]).toContain(scooter);
    });
    
    test("throws an error if the station does not exist", () => {
        expect(() => {
          scooterApp.createScooter("non-existing-station");
        }).toThrowError("No such station");
    });

    // dock scooter
    test('scooter should be added to stations scooter list and scooter is docked is logged to the console', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
        scooterApp.dockScooter(scooter, "Enfield");
        let station = scooterApp.stations["Enfield"];
        expect(console.log).toHaveBeenCalledWith('scooter is docked');
        expect(station).toContain(scooter);
        spy.mockRestore();
    })

    test('throws error if station does not exist', () => {
        expect(() => {
            scooterApp.dockScooter(scooter, "Non-existent Station");
        }).toThrowError("no such station");
    });

    test('should throw error if scooter is already at the station', () => {
        let station = scooterApp.stations["Enfield"];
        expect(station).toContain(scooter);
        expect(() => {
            scooterApp.dockScooter(scooter, "Enfield");
            }).toThrowError('scooter already at station');
    })
    
      

})

