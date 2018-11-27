#!/usr/bin/env node

const proxy = require("../src/proxy");
const server = require("../src/server");

server(proxy("http://localhost:3000/")).listen();
