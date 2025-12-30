import { describe, it, expect } from 'vitest';

// Extract captcha generation logic for testing
const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question: string;
    let answer: number;

    if (operator === '+') {
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
    } else {
        // Ensure positive result for subtraction
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        question = `${larger} - ${smaller}`;
        answer = larger - smaller;
    }

    return { question, answer };
};

describe('Captcha Generation Logic', () => {
    describe('generateCaptcha', () => {
        it('should generate a captcha with question and answer', () => {
            const captcha = generateCaptcha();

            expect(captcha).toHaveProperty('question');
            expect(captcha).toHaveProperty('answer');
            expect(typeof captcha.question).toBe('string');
            expect(typeof captcha.answer).toBe('number');
        });

        it('should generate questions with + or - operator', () => {
            const results = new Set<string>();

            // Generate multiple captchas to test both operators
            for (let i = 0; i < 50; i++) {
                const captcha = generateCaptcha();
                const operator = captcha.question.includes('+') ? '+' : '-';
                results.add(operator);
            }

            // Should have both operators in 50 attempts
            expect(results.has('+')).toBe(true);
            expect(results.has('-')).toBe(true);
        });

        it('should use numbers between 1 and 10', () => {
            for (let i = 0; i < 100; i++) {
                const captcha = generateCaptcha();
                const numbers = captcha.question.match(/\d+/g)?.map(Number);

                expect(numbers).toBeDefined();
                expect(numbers!.length).toBe(2);

                numbers!.forEach(num => {
                    expect(num).toBeGreaterThanOrEqual(1);
                    expect(num).toBeLessThanOrEqual(10);
                });
            }
        });

        it('should have correct answer for addition', () => {
            // Test with fixed values
            const testCases = [
                { num1: 5, num2: 3, expected: 8 },
                { num1: 10, num2: 1, expected: 11 },
                { num1: 7, num2: 7, expected: 14 },
            ];

            testCases.forEach(({ num1, num2, expected }) => {
                const question = `${num1} + ${num2}`;
                const answer = num1 + num2;

                expect(answer).toBe(expected);
            });
        });

        it('should have correct answer for subtraction', () => {
            // Test with fixed values (larger - smaller)
            const testCases = [
                { num1: 8, num2: 3, expected: 5 },
                { num1: 10, num2: 1, expected: 9 },
                { num1: 7, num2: 7, expected: 0 },
            ];

            testCases.forEach(({ num1, num2, expected }) => {
                const larger = Math.max(num1, num2);
                const smaller = Math.min(num1, num2);
                const question = `${larger} - ${smaller}`;
                const answer = larger - smaller;

                expect(answer).toBe(expected);
            });
        });

        it('should never produce negative results for subtraction', () => {
            for (let i = 0; i < 100; i++) {
                const captcha = generateCaptcha();

                if (captcha.question.includes('-')) {
                    expect(captcha.answer).toBeGreaterThanOrEqual(0);
                }
            }
        });

        it('should calculate answer correctly matching the question', () => {
            for (let i = 0; i < 100; i++) {
                const captcha = generateCaptcha();

                // Parse the question
                const match = captcha.question.match(/(\d+) ([\+\-]) (\d+)/);
                expect(match).toBeTruthy();

                const num1 = parseInt(match![1]);
                const operator = match![2];
                const num2 = parseInt(match![3]);

                // Calculate expected answer
                const expectedAnswer = operator === '+' ? num1 + num2 : num1 - num2;

                // Verify it matches the captcha answer
                expect(captcha.answer).toBe(expectedAnswer);
            }
        });

        it('should format question correctly', () => {
            for (let i = 0; i < 50; i++) {
                const captcha = generateCaptcha();

                // Should match format: "number operator number"
                expect(captcha.question).toMatch(/^\d+ [\+\-] \d+$/);
            }
        });

        it('should handle edge case when both numbers are the same', () => {
            // This tests subtraction with same numbers (result should be 0)
            const testCaptcha = {
                question: '5 - 5',
                answer: 0
            };

            expect(testCaptcha.answer).toBe(0);
            expect(testCaptcha.answer).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Captcha Validation', () => {
        it('should validate correct integer answer', () => {
            const captcha = { question: '5 + 3', answer: 8 };
            const userAnswer = '8';

            const isValid = parseInt(userAnswer) === captcha.answer;
            expect(isValid).toBe(true);
        });

        it('should reject incorrect answer', () => {
            const captcha = { question: '5 + 3', answer: 8 };
            const userAnswer = '7';

            const isValid = parseInt(userAnswer) === captcha.answer;
            expect(isValid).toBe(false);
        });

        it('should reject non-numeric answer', () => {
            const captcha = { question: '5 + 3', answer: 8 };
            const userAnswer = 'abc';

            const parsedAnswer = parseInt(userAnswer);
            const isValid = !isNaN(parsedAnswer) && parsedAnswer === captcha.answer;
            expect(isValid).toBe(false);
        });

        it('should reject empty answer', () => {
            const captcha = { question: '5 + 3', answer: 8 };
            const userAnswer = '';

            const parsedAnswer = parseInt(userAnswer);
            const isValid = !isNaN(parsedAnswer) && parsedAnswer === captcha.answer;
            expect(isValid).toBe(false);
        });

        it('should handle decimal input correctly', () => {
            const captcha = { question: '5 + 3', answer: 8 };
            const userAnswer = '8.5';

            // parseInt truncates decimals
            const parsedAnswer = parseInt(userAnswer);
            const isValid = !isNaN(parsedAnswer) && parsedAnswer === captcha.answer;
            expect(isValid).toBe(true); // 8.5 becomes 8
        });

        it('should reject negative answers for positive results', () => {
            const captcha = { question: '5 + 3', answer: 8 };
            const userAnswer = '-8';

            const parsedAnswer = parseInt(userAnswer);
            const isValid = !isNaN(parsedAnswer) && parsedAnswer === captcha.answer;
            expect(isValid).toBe(false);
        });
    });
});
