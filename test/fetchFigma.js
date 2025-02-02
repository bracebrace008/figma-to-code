const axios = require("axios");
const fs = require("fs");
const { figmaToTailwind } = require("../dist/tailwind/tailwindMain");

const FIGMA_API_URL = "https://api.figma.com/v1/files/";
const FILE_KEY = "MbUzcnUAQ8QER5qFcWlcjQ";
const ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
console.log(ACCESS_TOKEN);

async function fetchFigmaFile() {
  const node_id = "12:9";
  try {
    const response = await axios.get(
      `${FIGMA_API_URL}${FILE_KEY}/nodes?ids=${node_id}`,
      {
        headers: {
          "X-Figma-Token": ACCESS_TOKEN,
        },
      }
    );
    const figmaContent = response.data["nodes"][node_id].document;
    fs.writeFileSync("figma_content.json", JSON.stringify(figmaContent, null, 2));
    
    const tailwindContent = await figmaToTailwind(figmaContent);
    fs.writeFileSync("tailwind.html", tailwindContent);
    
    console.log("Figma content and Tailwind content have been saved.");
  } catch (error) {
    console.error("Error fetching Figma file:", error);
  }
}

fetchFigmaFile();
