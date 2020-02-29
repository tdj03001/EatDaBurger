const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

router.get("/", function (req, res) {
  burger.all(function (data) {
    const hbsObj = {
      burgers: data
    };
    console.log(hbsObj);
    res.render("index", hbsObj);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function (result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  const status = "id = " + req.params.id;

  console.log("status", status);

  burger.update({
    devoured: req.body.devoured
  }, status, function (result) {
    if (result.changedRows === 0) {
      return res.statusMessage(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function (req, res) {
  const status = "id = " + req.params.id;

  burger.delete(status, function (result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


module.exports = router;