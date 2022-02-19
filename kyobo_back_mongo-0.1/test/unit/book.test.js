const bookController = require("../../controller/books");
const Book = require("../../models/book");
const httpMocks = require("node-mocks-http");
const newBook = require("../data/new-book.json");

// Book Model Mock 생성
Book.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createRequest();
    next = null;
})

describe("Book Controller Create", () => {
    beforeEach(() => {
        req.body = newBook;
    })
    it("should have a createBook function", () => {
        expect(typeof bookController.createBook).toBe("function")
    });

    it("should call Book.create", () => {
        bookController.createBook(req, res);
        expect(Book.create).toBeCalledWith(newBook);
    });
});

// describe("Book Controller Create", () => {
//     it("should have a createBook function", () => {
//         expect(typeof bookController.createBook).toBe("function")
//     });

//     it("should call Book.create", () => {
//         let req = httpMocks.createRequest();
//         let res = httpMocks.createRequest();
//         let next = null;

//         req.body = newBook;

//         bookController.createBook(req, res);
//         expect(Book.create).toBeCalledWith(newBook);
//     });
// });


// describe("Calculation", () => {
//     // 비동기 처리
//     test("two plus two is four", () => {
//         // 2+2가 4여야 한다.
//         expect(2 + 2).toBe(4);
//     });

//     test("two plus two is not five", () => {
//         expect(2 + 2).not.toBe(5);
//     });
// });