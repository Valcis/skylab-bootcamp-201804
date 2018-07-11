'use strict';

describe("challengeAbel", function() {
    var person = new CreatePerson();
    var anotherPerson = new CreatePerson();
    it("should person.info return different than anotherPerson.info", function() {
        expect(person.info).not.toBe(anotherPerson.info);
    });

    
});