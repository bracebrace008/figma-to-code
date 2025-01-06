import { paintToCSS } from "./utils/colorUtil";
import testJson from "./test.json";
import { getTailwindAutoLayout } from "./tailwind/tailwindAutoLayout";
import { getTailwindPadding } from "./tailwind/tailwindPadding";
import { tailwindGenerator } from "./tailwind/tailwindMain";

console.log((testJson as any).fills[0].type);

console.log(tailwindGenerator((testJson as any)));
