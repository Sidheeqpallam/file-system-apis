const asyncHandler = require("express-async-handler");
const { Data } = require("../models");

exports.existParent = asyncHandler(async (parentId) => {
  const parent = await Data.findAll({ where: { id: parentId } });
  if (parent[0]) return true;
  throw Error("parent not exist");
});

exports.isParent = async (parentId) => {
  const childrens = await Data.findAll({ where: { id: parentId } });
  // if(childrens[0])
};
