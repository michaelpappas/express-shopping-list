/** Routes for sample app. */

const express = require("express");

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

  return res.json({added: newItem})
});


/** GET /items/id: gets a single item */

router.get("/:id", function (req, res) {
  const item = req.params.id;
  console.log("item to search:", item, db.items)

  const result = db.items.find( ({name}) => name === item)

  console.log(result)

  // throw error if item is not found

  if(result){
    return res.json({"test":result})
  }


  // const newItem = req.body;
  // db.items.push(newItem);
  // console.log("Fake DB now=", db.items)

  // return res.json({added: newItem})
});


module.exports = router;