const axios = require("axios");


async function fetchFigmaFile() {
  try {
    const response = await axios.get(
      `${FIGMA_API_URL}${FILE_KEY}/nodes?ids=54:69&depth=2`,
      {
        headers: {
          "X-Figma-Token": ACCESS_TOKEN,
        },
      }
    );
    delete response.data["nodes"]["54:69"].document.children;
    console.log(JSON.stringify(response.data["nodes"]["54:69"].document));
    // console.log(JSON.stringify(response.data["nodes"]["54:69"]));
  } catch (error) {
    console.error("Error fetching Figma file:", error);
  }
}

fetchFigmaFile();

function parseFigmaNodeToReactComponent(node) {
  if (!node || !node.document) {
    console.error("Invalid Figma node");
    return;
  }

  const { name, type, children } = node.document;

  let component = "";

  switch (type) {
    case "FRAME":
    case "GROUP":
      component += `<div className="container mx-auto">\n`;
      if (children && children.length > 0) {
        children.forEach((child) => {
          component += parseFigmaNodeToReactComponent({ document: child });
        });
      }
      component += `</div>\n`;
      break;
    case "TEXT":
      component += `<p className="text-base">${name}</p>\n`;
      break;
    case "RECTANGLE":
      component += `<div className="bg-gray-200 w-full h-64"></div>\n`;
      break;
    default:
      console.warn(`Unsupported node type: ${type}`);
  }

  return component;
}
