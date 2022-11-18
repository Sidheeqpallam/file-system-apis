const { Data } = require("../models/Data");
const asyncHandler = require("express-async-handler");

exports.getChildrens = asyncHandler(async (arr) => {
  const ids = [];
  if (!arr[0]) {
    return null;
  } else {
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
      arr[i].childrens = await Data.findAll({ where: { parentId: arr[i].id } });
      return getChildrens(arr[i].childrens);
    }
  }
  return ids;
});
