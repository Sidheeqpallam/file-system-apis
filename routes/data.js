const router = require("express").Router();
const { Data } = require("../models");
const {
  postData,
  getAllDatas,
  deleteById,
  getChildrens,
  getParent,
} = require("../controllers/data-controller");

// All datas
router.get("/datas", getAllDatas);

// Create data
router.post("/datas", postData);

// delete data
router.delete("/datas/:id", deleteById);

// Childrens of a parent
router.get("/datas/childrens/:parentId", getChildrens);

// Parent of a child
router.get("/datas/parent/:childId", getParent);

module.exports = router;
