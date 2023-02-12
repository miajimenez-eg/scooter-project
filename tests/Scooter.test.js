const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('scooter is an object', () => {
    // edit this to be a real test!
    expect(typeof scooter).toBe("object");
  })

  const scooter = new Scooter("London");
  const scooter2 = new Scooter("Manchester");

  test('instance has correct properties', () => {
    expect(scooter).toHaveProperty("user", null);
    expect(scooter).toHaveProperty("charge");
    expect(scooter).toHaveProperty("serialNum");
    expect(typeof scooter.isBroken).toBe("boolean");
    expect(scooter.station).toBe("London");
  })

  test('instance static value incrementing', () => {
    expect(scooter2.serialNum).toBe(scooter.serialNum + 1)
  })
  
})

// Method tests
describe('scooter methods', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  const scooter3 = new Scooter("Madrid")
  // tests here!

  //rent method
  test('should rent scooter successfully when charged and not broken', () => {
    scooter3.charge = 50;
    scooter3.isBroken = false;
    const user = {};
    scooter3.rent(user);
    expect(scooter3.user).toBe(user);
    expect(scooter3.station).toBe(null);
  });
  
  test('should throw error when trying to rent uncharged or broken scooter', () => {
    scooter3.charge = 15;
    expect(() => scooter3.rent({})).toThrow('Scooter needs to be charged');
    scooter3.charge = 50;
    scooter3.isBroken = true;
    expect(() => scooter3.rent({})).toThrow('Scooter needs repair');
  });

  //dock method

  test('should return scooter to the station', () => {
    const scooter = new Scooter("London")
    scooter3.dock("Milan");
    expect(scooter.station).toBe("Milan");
  })

  test('should checkout user', () => {
    const scooter = new Scooter("London")
    scooter.dock("Milan");
    expect(scooter.user).toBe(null);
  })

  // requestRepair method
  test('should successfully repair scooter', () => {
    scooter3.isBroken = true;
    scooter3.requestRepair();
    jest.advanceTimersByTime(5000);
    expect(scooter3.isBroken).toBe(false);
  })

  // charge method
  test('should recharge scooter successfully', () => {
    scooter3.charge = 50;
    scooter3.recharge();
    expect(scooter3.charge).toBe(100);
  })


})
