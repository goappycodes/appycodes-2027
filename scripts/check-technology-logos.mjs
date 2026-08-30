import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

// Read the same registry used by the UI; no separate test-only logo mapping.
const exports = {};
new Function("exports", ts.transpileModule(readFileSync("lib/technologies.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(exports);
const names = new Set();
const collect = (array) => {
  if (array && ts.isArrayLiteralExpression(array)) {
    for (const item of array.elements) if (ts.isStringLiteral(item)) names.add(item.text);
  }
};
const files = ["lib/sectors-data.ts", "components/service-stack.tsx", "components/institutional-creoate-case-study.tsx"];
for (const dir of readdirSync("app/case-studies", { withFileTypes: true })) {
  const file = join("app/case-studies", dir.name, "page.tsx");
  if (dir.isDirectory() && existsSync(file)) files.push(file);
}
for (const file of files) {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && ["tech", "stack"].includes(node.name.getText(source).replaceAll('"', ""))) collect(node.initializer);
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === "STACKS") {
      for (const prop of node.initializer.properties) if (ts.isPropertyAssignment(prop)) collect(prop.initializer);
    }
    if (ts.isJsxAttribute(node) && node.name.getText(source) === "items" && node.initializer && ts.isJsxExpression(node.initializer)) collect(node.initializer.expression);
    ts.forEachChild(node, visit);
  };
  visit(source);
}
assert(names.size > 40, "Expected sector, service and case-study technology lists");
for (const name of names) {
  const technology = exports.technologyFor(name);
  if (technology.logo) assert(existsSync(join("public", technology.logo)), `${name}: missing logo file`);
  else assert(["REST APIs", "LLM APIs", "PDF extraction"].includes(name), `${name}: a brand needs a logo`);
}
assert.throws(() => exports.technologyFor("Unregistered tool"), /verified logo/);
console.log(`Verified ${names.size} technology names across ${files.length} source files; all branded tools have local logos.`);
