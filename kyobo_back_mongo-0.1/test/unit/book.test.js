const bookController = require("../../controller/books");
const Book = require("../../models/book");
const httpMocks = require("node-mocks-http");
const newBook = require("../data/new-book.json");
const allBooks = require("../data/all-books.json");

// Book Model Mock 생성
Book.create = jest.fn();
Book.findAll = jest.fn();
Book.findById = jest.fn();
Book.updateById = jest.fn();
Book.deleteById = jest.fn();

const bookId = "620f551aae178ac69eec1272";
const updateBook = {
    "title": "이상한 과자 가게 전천당", 
    "author": "히로시마 레이코", 
    "price": 16200
}

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

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

describe("Book Controller Get", () => {
    it("should have a getBooks function", () => {
        expect(typeof bookController.getBooks).toBe("function")
    })
    it("should return 200 response", async () => {
        await bookController.getBooks(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })
    it("should return json body in response", async () => {
        Book.findAll.mockReturnValue(allBooks)
        await bookController.getBooks(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allBooks)
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Error finding book data" }
        const rejectedPromise = Promise.reject(errorMessage)
        Book.findAll.mockReturnValue(rejectedPromise);
        await bookController.getBooks(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
});

describe("Book Controller GetById", () => {
    it("should have a GetById function", () => {
        expect(typeof bookController.getBookById).toBe("function")
    })
    it("should call Book.findById", async () => {
        req.params.id = bookId;
        await bookController.getBookById(req, res, next);
        expect(Book.findById).toBeCalledWith(bookId)
    })
    it("should return json body and response code 200", async () => {
        Book.findById.mockReturnValue(newBook);
        await bookController.getBookById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newBook);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Error finding book data" }
        const rejectedPromise = Promise.reject(errorMessage)
        Book.findById.mockReturnValue(rejectedPromise);
        await bookController.getBookById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
});

describe("Book Controller Update", () => {
    it("should have a updateBook function", () => {
        expect(typeof bookController.updateBook).toBe("function")
    })
    it("should call Book.updateById", async () => {
        req.params.id = bookId;
        req.body = updateBook;
        await bookController.updateBook(req, res, next);
        expect(Book.updateById).toBeCalledWith(bookId, updateBook)
    })
    it("should return json body and response code 200", async () => {
        req.params.id = bookId;
        req.body = updateBook;
        Book.updateById.mockReturnValue(updateBook);
        await bookController.updateBook(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updateBook);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should hadle 404 when item doesnt exist", async () => {
        Book.updateById.mockReturnValue(null);
        await bookController.updateBook(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Error" }
        const rejectedPromise = Promise.reject(errorMessage)
        Book.updateById.mockReturnValue(rejectedPromise);
        await bookController.updateBook(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
});

describe("Book Controller Delete", () => {
    it("should have a deleteBook function", () => {
        expect(typeof bookController.deleteBook).toBe("function")
    })
    it("should call Book.deleteById", async () => {
        req.params.id = bookId;
        await bookController.deleteBook(req, res, next);
        expect(Book.deleteById).toBeCalledWith(bookId)
    })
    it("should return json body and response code 200", async () => {
        req.params.id = bookId;
        Book.deleteById.mockReturnValue(bookId);
        await bookController.deleteBook(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should hadle 404 when item doesnt exist", async () => {
        Book.deleteById.mockReturnValue(null);
        await bookController.deleteBook(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Error" }
        const rejectedPromise = Promise.reject(errorMessage)
        Book.deleteById.mockReturnValue(rejectedPromise);
        await bookController.deleteBook(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
});