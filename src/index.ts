import { paintToCSS } from "./utils/colorUtil";
import testJson from "./test.json";
import { getTailwindAutoLayout } from "./tailwind/tailwindAutoLayout";
import { getTailwindPadding } from "./tailwind/tailwindPadding";

console.log((testJson as any).fills[0].type);

console.log(getTailwindPadding((testJson as any)));
