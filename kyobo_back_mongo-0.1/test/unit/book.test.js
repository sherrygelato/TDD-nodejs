describe("Calculation", () => {
    // 비동기 처리
    test("two plus two is four", () => {
        // 2+2가 4여야 한다.
        expect(2 + 2).toBe(4);
    });

    test("two plus two is not five", () => {
        expect(2 + 2).not.toBe(5);
    });
});