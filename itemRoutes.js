/** Routes for sample app. */

const express = require("express");
const {NotFoundError} = require("./expressError")

const db = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json(db.items);
});

/** POST /items: add a new item. Returns { name: 'Grinder', price: 1000 } */

router.post("/", function (req, res) {

  const newItem = req.body;
  db.items.push(newItem);
  // console.log("Fake DB now=", db.items)

  res.json({added: newItem})
});


/** GET /items/id: gets a single item */

router.get("/:id", function (req, res) {

  const product = db.items.find( ({name}) => name === req.params.id)

  if(product){
    res.json({"added":product})
  }
  else{
    throw new NotFoundError()
  }
});

/** PATCH /items: add a new item. Returns { name: 'Grinder', price: 1000 } */

router.patch("/:id", function (req, res) {

  const product = db.items.find( ({name}) => name === req.params.id)

  if(product){
    if(req.body.price) product.price = req.body.price

    if(req.body.name) product.name = req.body.name

    res.json({"updated":product})
  }
  else{
    throw new NotFoundError()
  }
});

router.delete("/:id", function (req, res) {

  const product = db.items.find( ({name}) => name === req.params.id)

  if(product){
    db.items = db.items.filter(item => item != product)

    res.json({"deleted":product})
  }
  else{
    throw new NotFoundError()
  }
})

module.exports = router;