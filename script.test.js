const script = require('./script.js');

describe('add', () => {
    test('adds 0 and 0', () => {
        expect(script.add(0,0)).toBe(0);
    });

    test('adds positive numbers', () => {
		expect(script.add(2,6)).toBe(8);
	});
});

describe('subtract', () => {
	test('subtracts numbers', () => {
		expect(script.subtract(10,4)).toBe(6);
	});
});

describe('multiply', () => {
    test('multiply positive numbers', () => {
        expect(script.multiply(3, 4)).toBe(12);
    });

    test('multiply two negatives', () => {
        expect(script.multiply(-4, -5)).toBe(20);
    });

    test('multiply postive and negative', () => {
        expect(script.multiply(7, -2)).toBe(-14);
    });

    test('multiply by zero', () => {
        expect(script.multiply(5, 0)).toBe(0);
    });
});

describe('divide', () => {
    test('divide positives', () => {
        expect(script.divide(10, 2)).toBe(5);
    });
    test('divide negatives', () => {
        expect(script.divide(-6, -3)).toBe(2);
    });
    test('divide zero by value', () => {
        expect(script.divide(0, 5)).toBe(0);
    });
    test('division by 0', () => {
        expect(script.divide(8, 0)).toBe('err');
    });
});

describe('operate', () => {
    test('returns addition', () => {
        expect(script.operate('+', 10, 2)).toBe(12);
    });
    test('returns subtraction', () => {
        expect(script.operate('-', 10, 2)).toBe(8);
    });
    test('returns multiplication', () => {
        expect(script.operate('*', 10, 2)).toBe(20);
    });
    test('returns division', () => {
        expect(script.operate('/', 10, 2)).toBe(5);
    });
    test('returns error', () => {
        expect(script.operate('/', 10, 0)).toBe('err');
    });
});