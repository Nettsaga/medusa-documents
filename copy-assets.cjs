const { copySync } = require("fs-extra");
const path = require("path");

copySync(
    path.join(__dirname, "src/modules/documents/assets"),
    path.join(__dirname, ".medusa/server/src/modules/documents/assets"),
    { overwrite: true }
);

console.log("✓ static assets copied into .medusa build");
