const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor(){
    this.stations = {
      "Kensington": [],
      "West Hampstead": [],
      "Camden": [],
      "Angel": [],
      "Enfield": [],
      "Shepherds Bush": [],
      "Greenwich": []
    }
    this.registeredUsers = {}
  }
  
  // registerUser(username, password, age)
  registerUser(username, password, age){
    if(this.registeredUsers[username]){
      throw new Error('already registered')
    } else if(age < 18){
      throw new Error('too young to register')
    } else {
      this.registeredUsers[username] = new User(username, password, age);
    }
  }


  // loginUser(username, password)
  loginUser(username, password) {
    if (!this.registeredUsers[username] || this.registeredUsers[username].password !== password) {
      throw new Error("Username or password is incorrect");
    } else {
      console.log(`User has been logged in`);
      return this.registeredUsers[username].login();
    }
  }

  // logoutUser(username)
  logoutUser(username) {
    if (!this.registeredUsers[username] || !this.registeredUsers[username].isLoggedIn) {
      throw new Error("No such user is logged in");
    }
    console.log(`User has been logged out`);
    return this.registeredUsers[username].logout();
  }
  
  // rentScooter(scooter, user)
  rentScooter(scooter, user) {
    const station = Object.values(this.stations).find(
      (value) => this.stations[value].includes(scooter)
    );
    if (!station) {
      throw new Error("scooter already rented");
    }
    this.stations[station] = this.stations[station].filter(
      (s) => s !== scooter
    );
    scooter.user = user;
    console.log("scooter is rented");
  }

  // createScooter(station)
  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station");
    }
    const scooter = new Scooter();
    this.stations[station].push(scooter);
    scooter.station = station;
    console.log("Created new scooter");
    return scooter;
  }

  // dockScooter(scooter, station)
  dockScooter(scooter, station) {
    let stationFound = false;
    for (let key in this.stations) {
        if (station === key) {
          let scooters = Object.values(this.stations[key]);
          if(scooters.includes(scooter)){
            throw new Error('scooter already at station');
          } else {

            this.stations[station].push(scooter);
            console.log('scooter is docked');
            stationFound = true;
  
            break;
          }

        }
    }

    if (!stationFound) {
        throw new Error('no such station');
    }
}

  

  // print()
  // print(){
  //   console.log(this.registeredUsers);
  //   console.log(this.stations);
  // }

}

module.exports = ScooterApp
