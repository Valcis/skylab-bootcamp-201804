//toRandomCase

describe("array.toRandomCase", function() {
  it('should return true (["alex","romina"].toRandomCase().toString().toLowerCase() === ["alex","romina"].toString()) && ["alex","romina"].toRandomCase().toString() !== ["alex","romina"].toString()', function() {
    expect(
      ["alex", "romina"]
        .toRandomCase()
        .toString()
        .toLowerCase() === ["alex", "romina"].toString() &&
        ["alex", "romina"].toRandomCase().toString() !==
          ["alex", "romina"].toString()
    ).toBe(true);
  });

  it("should launch an error", function() {
    expect(function() {
      [1, "alex"].toRandomCase();
    }).toThrow(Error("not a string array"));
  });

  it("should launch an error", function() {
    expect(function() {
      [].toRandomCase();
    }).toThrow(Error("empty array"));
  });
});

// FilterPerson

describe("filterPerson", function() {
  it('should return an object with default values, name, height, weight, age, gender, civil status if we do Person("John",1.77,67,29,"male","Married"', function() {
    expect(
      (function() {
        var new_person = new Person("Jonathan");
        return new_person.name;
      })() !== undefined
    ).toBe(true);
  });

  var person1 = new Married("Jaime", 1.87, 65, 20, "male");
  var person2 = new Married("Helena", 1.57, 80, 32, "female");
  var person3 = new Single("Jaimie", 1.77, 65, 20, "female");
  var person4 = new Married("John", 1.77, 77, 29, "male");
  var person5 = new Married("Johnie", 1.64, 77, 29, "female");
  var person6 = new Single("Carla", 1.63, 56, 24, "female");
  trialArray = [person1, person2, person3, person4, person5, person6];

  it("should work properly", function() {
    expect(
      
       (trialArray.newFilter(function(obj) {
        return (obj.weight > 70 && obj.height > 1.65);
      }))[0].name
    ).toBe("John");
  });

  it("should work properly", function() {
    expect(
      
       (trialArray.newFilter(function(obj) {
        return (obj.weight > 70 && obj.height > 1.65);
      })).length
    ).toBe(1);
  });

  var person1 = new Married("Jaime", 1.87, 65, 20, "male");
  var person2 = new Married("Helena", 1.57, 80, 32, "female");
  var person3 = new Single("Jaimie", 1.77, 65, 20, "female");
  var person4 = new Married("John", 1.77, 77, 29, "male");
  var person5 = new Married("Johnie", 1.64, 77, 29, "female");
  var person6 = new Single("Carla", 1.63, 56, 24, "female");
  trialArray = [person1, person2, person3, person4, person5, person6];

  it("should work properly", function() {
    expect(
      
       (trialArray.newFilter(function(obj) {
        return (obj.weight > 70 && obj.height > 1.65);
      })).length
    ).toBe(1);
  });


});


// ListNumbers (Sandy to Mikel)

describe('List of numbers with 0', function(){
    it('should return [["03","01"],["02"]) when [1,2,3].listNumbers()', function(){
        expect([1,2,3].listNumbers().toString()).toBe([["03","01"],["02"]].toString())
    })

    it('should throw an error', function(){
        expect(function(){
            [3,'a',6].lisNumbers()
        }).toThrow(Error('wrong input array type'))
    })
})
