class Scooter{
  // scooter code here
  static nextSerialNum = 0;
  
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serialNum = Scooter.nextSerialNum;
    Scooter.nextSerialNum++;
    this.charge = 100;
    this.isBroken = false;
  }

  // rent() method
  rent(user) {
    if(this.charge > 20 && !this.isBroken){
      this.station = null;
      this.user = user;
    } else if(this.charge < 20){
      throw new Error("Scooter needs to be charged");
    } else if(this.isBroken){
      throw new Error("Scooter needs repair");
    }
  }
  // dock(station) method
  dock(station) {
    this.station = station;
    this.user = null;
  }

  // requestRepair() method
  requestRepair() {
    if(this.isBroken){
      setTimeout(() => {
        this.isBroken = false;
        console.log("repair completed");
      }, 5000);
    }
  }
  
  // recharge() method
  recharge() {
    while(this.charge < 100){
      this.charge ++;
    }
    
  }
}


module.exports = Scooter
