import { paintToCSS } from "./utils/colorUtil";
import testJson from "./test.json";
import { getTailwindAutoLayout } from "./tailwind/tailwindAutoLayout";
import { getTailwindPadding } from "./tailwind/tailwindPadding";
import { tailwindMain } from "./tailwind/tailwindMain";

async function main() {
  const content = await tailwindMain(testJson as any);
  console.log(content);
}

main();
