'use strict'

describe('logic (calculator)', function() {
    let calc

    beforeEach(function() {
        calc = new Calculator()
    })

    it('should invalid number throw error', function() {
        expect(function() {
            calc.number()
        }).toThrow()
    })

    it('should 1 + 1 + 1 = 3', function() {
        calc.number(1)
        expect(calc.status()).toBe(1)

        calc.sum()
        expect(calc.status()).toBe(1)

        calc.number(1)
        expect(calc.status()).toBe(1)

        calc.sum()
        expect(calc.status()).toBe(2)

        calc.number(1)
        expect(calc.status()).toBe(1)

        calc.result()
        expect(calc.status()).toBe(3)
    })

    it('should -1 + 1 = 0', function() {
        calc.number(1)
        expect(calc.status()).toBe(1)

        calc.negate()
        expect(calc.status()).toBe(-1)

        calc.sum()
        expect(calc.status()).toBe(-1)

        calc.number(1)
        expect(calc.status()).toBe(1)

        calc.result()
        expect(calc.status()).toBe(0)
    })

    it('should 5 - 2 - 1 = 2', function() {
        calc.number(5)
        expect(calc.status()).toBe(5)

        calc.subs()
        expect(calc.status()).toBe(5)

        calc.number(2)
        expect(calc.status()).toBe(2)

        calc.subs()
        expect(calc.status()).toBe(3)

        calc.number(1)
        expect(calc.status()).toBe(1)

        calc.result()
        expect(calc.status()).toBe(2)
    })

    it('should 5 * 2 * 3 = 30', function() {
        calc.number(5)
        expect(calc.status()).toBe(5)

        calc.mul()
        expect(calc.status()).toBe(5)

        calc.number(2)
        expect(calc.status()).toBe(2)

        calc.mul()
        expect(calc.status()).toBe(10)

        calc.number(3)
        expect(calc.status()).toBe(3)

        calc.result()
        expect(calc.status()).toBe(30)
    })

    it('should 30 / 3 / 2 = 5', function() {
        calc.number(30)
        expect(calc.status()).toBe(30)

        calc.div()
        expect(calc.status()).toBe(30)

        calc.number(3)
        expect(calc.status()).toBe(3)

        calc.div()
        expect(calc.status()).toBe(10)

        calc.number(2)
        expect(calc.status()).toBe(2)

        calc.result()
        expect(calc.status()).toBe(5)
    })
})