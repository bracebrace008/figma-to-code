import { paintToCSS } from "./utils/colorUtil";
import testJson from "./test.json";
import { getTailwindAutoLayout } from "./tailwind/tailwindAutoLayout";

console.log((testJson as any).fills[0].type);

console.log(getTailwindAutoLayout((testJson as any)));
