const { Data } = require("../models/Data");
const asyncHandler = require("express-async-handler");

exports.getChildren = asyncHandler(async (arr) => {
  const ids = [];
  if (!arr[0]) {
    return null;
  } else {
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
      arr[i].children = await Data.findAll({ where: { parentId: arr[i].id } });
      return this.getChildren(arr[i].children);
    }
  }
  return ids;
});

exports.getChildrenInHeirarchy = asyncHandler(async (arr) => {
  if (!arr[0]) {
    return null;
  } else {
    for (let i = 0; i < arr.length; i++) {
      arr[i].children = await Data.findAll({ where: { parentId: arr[i].id } });
      return getChildrenInHeirarchy(arr[i].children);
    }
  }
  return arr;
});
