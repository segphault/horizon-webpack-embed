'use strict';

const app = require("koa")();
const server = require("http").createServer(app.callback());

require("./webpack")(app);
require("@horizon/server")(server, {
  rdb_host: "rethinkdb-stable",
  auto_create_table: true,
  auto_create_index: true
});

app.use(require("koa-static")(`${__dirname}/public`));
server.listen(8000, () => console.log("Server started on 8000"));
