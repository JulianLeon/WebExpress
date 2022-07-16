const express = require("express");
const router = express.Router();

const articles = [
  {
    title: "Test Article",
    createdAt: Date.now(),
    description: "Test description",
  },
];

router.get("/", (req, res) => {
  res.render("blog", { articles: articles });
});

module.exports = router;
