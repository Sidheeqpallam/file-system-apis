const { Data } = require("../models/Data");
const { Op } = require("sequelize");
const {
  getChildren,
  getChildrenInHeirarchy,
} = require("../helpers/get-children");
const asyncHandler = require("express-async-handler");

exports.postData = asyncHandler(async (req, res) => {
  const { name, parentId } = req.body;
  if (parentId) {
    const parent = await Data.findAll({ where: { id: parentId } });
    if (parent[0]) {
      const data = await Data.create({
        name,
        parentId,
      });
      res.json(data);
    } else {
      console.log(err.message);
      res.status(400).json({ message: "Parent not exist in this id." });
    }
  } else {
    const data = await Data.create({
      name,
    });
    res.json(data);
  }
});

exports.deleteById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Id is required." });
  }
  const datas = await Data.findAll({ where: { id } });
  if (!datas[0]) {
    return res.status(400).json({ message: "There is no data in this id." });
  }
  const children = await Data.findAll({ where: { parentId: datas[0].id } });
  if (!children[0]) {
    const deletedNo = await Data.destroy({ where: { id } });
    res.json({ message: `${deletedNo} data deleted.` });
  } else {
    const childrenIds = await getChildren(children);
    children.push(id);
    const deletedNo = await Data.destroy({
      where: { id: { [Op.or]: childrenIds } },
    });
    res.json({ message: `${deletedNo} datas deleted.` });
  }
});

exports.getChildren = asyncHandler(async (req, res) => {
  const parentId = req.params.parentId;
  if (!parentId) {
    return res.status(400).json({ message: "Parent id is required." });
  }
  const parent = await Data.findAll({ where: { id: parentId } });
  if (!parent[0]) {
    return res.status(400).json({ message: "Parent is not found in this id." });
  }
  const children = await Data.findAll({ where: { parentId } });
  if (!children[0]) {
    return res.json({ message: "Any children exist inside of this parent." });
  }
  res.send(children);
});

exports.getParent = asyncHandler(async (req, res) => {
  const childrenId = req.params.childId;
  if (!childrenId) {
    return res.status(400).json({ message: "children id is required." });
  }
  const children = await Data.findAll({ where: { id } });
  if (!children[0]) {
    return res
      .status(400)
      .json({ message: "Children in this id is not exist." });
  }
  if (!children[0].parentId) {
    return res.json({ message: "This is root parent. No parent behind it" });
  }
  const parent = await Data.findAll({ where: { id: children[0].parentId } });
  if (!parent[0]) {
    return res.status(400).json({ message: "Parent is not exist." });
  }
  res.send(parent);
});

exports.getAllData = asyncHandler(async (req, res) => {
  const ancestors = await Data.findAll({ where: { parentId: null } });
  const data = await getChildrenInHeirarchy(ancestors);
  res.send(data);
});
