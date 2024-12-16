import { paintToCSS } from "./utils/colorUtil";
import testJson from "./test.json";

console.log((testJson as any).fills[0].type);

console.log(paintToCSS((testJson as any).fills[0]));
