import { readdirSync } from "fs";
import { join } from "path";

const dir = __dirname;
const readDir = readdirSync(dir);

readDir.forEach(x => {
  if(x.endsWith(".js") && !x.startsWith("index"))
  import(join(dir, x))
});
