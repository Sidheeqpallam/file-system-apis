const { getChildrens } = require("../helpers/get-childrens");
const { Data } = require("../models");
const { Op } = require("sequelize");
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
  const childrens = await Data.findAll({ where: { parentId: datas[0].id } });
  if (!childrens[0]) {
    const deletedNo = await Data.destroy({ where: { id } });
    res.json({ message: `${deletedNo} data deleted.` });
  } else {
    const childrensIds = await getChildrens(childrens);
    childrens.push(id);
    const deletedNo = await Data.destroy({
      where: { id: { [Op.or]: childrensIds } },
    });
    res.json({ message: `${deletedNo} datas deleted.` });
  }
});

exports.getChildrens = asyncHandler(async (req, res) => {
  const parentId = req.params.parentId;
  if (!parentId) {
    return res.status(400).json({ message: "Parent id is required." });
  }
  const parent = await Data.findAll({ where: { id: parentId } });
  if (!parent[0]) {
    return res.status(400).json({ message: "Parent is not found in this id." });
  }
  const childrens = await Data.findAll({ where: { parentId } });
  if (!childrens[0]) {
    return res.json({ message: "Any children exist inside of this parent." });
  }
  res.send(childrens);
});

exports.getParent = asyncHandler(async (req, res) => {
  const childrenId = req.params.id;
  if (!childrenId) {
    return res.status(400).json({ message: "Childrens id is required." });
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

exports.getAllDatas = (req, res) => {
  Data.findAll()
    .then((datas) => {
      res.json(datas);
    })
    .catch((err) => {
      err ? console.log(err) : null;
    });
};
