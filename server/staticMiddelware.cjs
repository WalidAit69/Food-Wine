const express = require("express");

const staticMiddelware = express.static((__dirname + "/uploads"));

module.exports = staticMiddelware;