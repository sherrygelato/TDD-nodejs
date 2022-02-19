const bookController = require("../../controller/books");
const Book = require("../../models/book");
const httpMocks = require("node-mocks-http");
const newBook = require("../data/new-book.json");

// Book Model Mock 생성
Book.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

describe("Book Controller Create", () => {
    beforeEach(() => {
        req.body = newBook;
    })
    it("should have a createBook function", () => {
        expect(typeof bookController.createBook).toBe("function")
    });

    it("should call Book.create", async () => {
        await bookController.createBook(req, res);
        expect(Book.create).toBeCalledWith(newBook);
    });

    it("should return 201 response code", async () => {
        await bookController.createBook(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should return json body in response", async () => {
        // 몽구스 함수 => mock으로 만ㄷㄹ어 놨기에
        // 누군가 book.create를 호출하면 newBook을 리턴하라
        // database에 정상적으로 저장이 되었다는 뜻

        // 몽구스 함수는 비동기로 동작함 원래 ㅇㅇ
        // async await를 넣어서 결과 나올때까지 기다리고 결과값 promise 성공이 오면 json으로 넘겨옴
        Book.create.mockReturnValue(newBook);
        await bookController.createBook(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newBook);
    });

    // 연극 무대 설정 ㅇㅇ
    it("should handle errors", async () => {
        const errorMessage = {
            message: "title property missing"
        };
        // promise 비동기값
        const rejectedPromise = Promise.reject(errorMessage);
        Book.create.mockReturnValue(rejectedPromise);

        await bookController.createBook(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
})