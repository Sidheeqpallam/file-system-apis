const router = require("express").Router();
const { Data } = require("../models");
const {
  postData,
  getAllDatas,
  deleteById,
  getChildrens,
} = require("../controllers/data-controller");

// All datas
router.get("/datas", getAllDatas);

// Create data
router.post("/datas", postData);

// delete data
router.delete("/datas/:id", deleteById);

// Childrens of a parent
router.get("/datas/childrens/:parentId", getChildrens);

// find by contition
router.get("/datasByContition", (req, res) => {
  Data.findAll({ where: { id: req.body.id } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      err ? console.log(err) : null;
    });
});

module.exports = router;
