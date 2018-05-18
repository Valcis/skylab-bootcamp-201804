'use strict';

describe('filterPerson', function () {
    it('should filter persons', function () {
        var alan = new Single("Alan", 1.80, 73, 30, "male");
        var carlos = new Married("Carlos", 1.75, 80, 60, "male");
        var inma = new Married("Inma", 1.60, 60, 58, "female");
        var zan = new Single("Zan", 1.63, 52, 30, "female");
        var alicia = new Single("Alicia", 1.59, 57, 28, "female");
        var joan = new Married("Joan", 1.73, 76, 38, "male");

        var persons = [alan, carlos, inma, zan, alicia, joan];

        var res = filterPerson(persons);

        expect(res.length).toBe(3);
        expect(res[0]).toEqual(persons[0]);
        expect(res[1]).toEqual(persons[1]);
        expect(res[2]).toEqual(persons[5]);
    });
});