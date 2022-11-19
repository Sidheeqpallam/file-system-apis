const router = require("express").Router();
const {
  postData,
  getAllData,
  deleteById,
  getChildren,
  getParent,
} = require("../controllers/data-controller");

// All datas
router.get("/data", getAllData);

// Create data
router.post("/data", postData);

// delete data
router.delete("/data/:id", deleteById);

// Childrens of a parent
router.get("/data/children/:parentId", getChildren);

// Parent of a child
router.get("/data/parent/:childId", getParent);

module.exports = router;
