const request = require('supertest');
const app = require('../../index');
const newBook = require("../data/new-book.json");

let firstBook;

// 실제 데이터 써서 해야함

// 유닛 테스트는 하나하나 다 쪼개는 느낌으로 한다.
// int 테스트는 기획 요구 사항에 맞아떨어지게 작성한다 => 프로그램 스펙이 된다.
// int 테스트는 req, res만 보면 api 설계 볼 수 있다.
// 비즈니스 로직 보면서 스펙 잡는게 어렵다. 그러나 구현은 쉽다.

// 이건 테스트 명세서 보는 것과 마찬가지다

it("Post /books", async () => {
    // 송신부
    const response = await request(app)
        .post("/books")
        .send(newBook);

    // 수신부
    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe(newBook.title)
    expect(response.body.author).toBe(newBook.author)
})

it("should return 500 on POST /books", async () => {
    const response = await request(app)
        .post('/books')
        .send({ title: "트렌드 코리아 2022" })
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message: "Book validation failed: author: Path `author` is required." })
})

it("GET /books", async () => {
    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].author).toBeDefined();
    // jest는 적혀있는 순서대로 된다
    // 밑에 코드와 체이닝된다.
    firstBook = response.body[0]
})

it("GET /books/:id", async () => {
    // firstBook 위에 있는 것과 체이닝 된다. chain. 연결됨
    const response = await request(app).get('/books/' + firstBook["_id"])
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(firstBook.title)
    expect(response.body.author).toBe(firstBook.author)
})

it("GET id doenst exist /books/:id", async () => {
    const response = await request(app).get('/books/5f5cb1f145b82ecaf43e3877')
    expect(response.statusCode).toBe(404);
})

it("PUT /books", async () => {
    const response = await request(app)
        .put("/books/" + firstBook["_id"])
        .send({ title: "updated title", price: 3000 });
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe("updated title")
    expect(response.body.price).toBe(3000)
})

it("should return 404 on PUT /api/products", async () => {
    const res = await request(app)
        .put("/books/" + "5f5d79abdc3acb1b95e0eb99") // firstBook id가 다른 것
        .send({ title: "updated title", price: 3000 });
    expect(res.statusCode).toBe(404);
})

it("DELETE /books", async () => {
    const res = await request(app)
        .delete("/books/" + firstBook["_id"])
        .send();
    expect(res.statusCode).toBe(200);
})

it("DELETE id doenst exist /books/:id", async () => {
    const res = await request(app)
        .delete("/books/" + firstBook["_id"])
        .send();
    expect(res.statusCode).toBe(404);
})

