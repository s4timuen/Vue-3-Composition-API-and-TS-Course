import { getRandomNumber } from "@/utils/utils.ts";

describe('Utils', () => {

    test('Get Random Number', () => {
        const reps: number = 10;
        const maxNumbers: number[] = [0, 1, 10];

        for (let index: number = 0; index < reps; index++) {
            maxNumbers.forEach((maxNumber: number) => {
                const randomNumber: number = getRandomNumber(maxNumber);

                expect(randomNumber).toBeTypeOf('number');
                expect(randomNumber).toBeGreaterThanOrEqual(0);
                expect(randomNumber).toBeLessThanOrEqual(maxNumber);
            });
        }
    });
});
