"use strict";

describe("filterPerson", function() {
    it("should filter persons", function (){
        var alan = new Single("Alan", 1.80, 73, 30, "male");
        var carlos = new Married("Carlos", 1.75, 80, 60, "male");
        var inma = new Married("Inma", 1.60, 60, 58, "female");
        var zan = new Single("Zan", 1.60, 52, 30, "female");
        var alicia = new Single("Alicia", 1.59, 58, 30, "female");
        var joan = new Married("Joan", 1.80, 63, 30, "male");

        var personArray = [alan, carlos, inma, zan, alicia, joan];

        var personsPlus70kgAbove165cm = personArray.filterPerson();

        expect(personsPlus70kgAbove165cm.length).toBe(3);
    })
})