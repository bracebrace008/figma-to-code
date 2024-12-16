const axios = require("axios");

const FIGMA_API_URL = "https://api.figma.com/v1/files/";
const FILE_KEY = "MbUzcnUAQ8QER5qFcWlcjQ";
const ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
console.log(ACCESS_TOKEN);

async function fetchFigmaFile() {
  const node_id = "12:9";
  try {
    const response = await axios.get(
      `${FIGMA_API_URL}${FILE_KEY}/nodes?ids=${node_id}&depth=2`,
      {
        headers: {
          "X-Figma-Token": ACCESS_TOKEN,
        },
      }
    );
    delete response.data["nodes"][node_id].document.children;
    console.log(JSON.stringify(response.data["nodes"][node_id].document));
    // console.log(JSON.stringify(response.data["nodes"]["54:69"]));
  } catch (error) {
    // console.error("Error fetching Figma file:", error);
  }
}

fetchFigmaFile();
