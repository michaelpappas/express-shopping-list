const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let grinder = { name: "grinder", price: 800 };

beforeEach(function() {
  db.items.push(grinder);
});

afterEach(function() {
  db.items = [];
});
// end


/** GET /items - returns ` [{ name: "grinder", price: 800 }] ` */

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual( [{ name: "grinder", price: 800 } ]);
  });
});
// end

/** GET /items/[item_id] - return data about one cat: `{ name: "grinder", price: 800 }` */

describe("GET /items/:id", function() {
  it("Gets a single item", async function() {
    const resp = await request(app).get("/items/grinder");

    expect(resp.body).toEqual({ name: "grinder", price: 800 });
  });

  it("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** POST /cats - create cat from data; return `{cat: cat}` */

describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Tacos",
        price: 600
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: { name: "Tacos", price: 600 }
    });
  });
});
// end

/** PATCH /items/[item_id] - update item; return `{ name: "grinder", price: 600 }` */

describe("PATCH /items/:id", function() {
  it("Updates a single cat", async function() {
    const resp = await request(app)
      .patch("/items/grinder")
      .send({
        price: 600
      });
    expect(resp.body).toEqual({
      updated: { name: "grinder", price: 600 }
    });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: }` */

describe("DELETE /items/:id", function() {
  it("Deletes a single a item", async function() {
    const resp = await request(app)
      .delete("/items/grinder");
      debugger;
    expect(resp.body).toEqual({ message: "deleted" });
    // expect(db.items.length).toEqual(0);
  });
});
// end