import { directoryTree, rootPath } from "../data/directoryTree.js";
import { findNodeByPath } from "../helpers/directoryTreeHelper.js";

// Sort function: directories first, then files, both alphabetically
const sortItems = (items) => {
  return items.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "directory" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
};

const getDirectoryContents = (req, res) => {
  try {
    const requestedPath = req.query.path || rootPath;

    // If requesting root path, return root level items
    if (requestedPath === rootPath) {
      const rootItems = directoryTree.map((item) => ({
        id: item.id,
        name: item.name,
        path: item.path,
        type: item.type,
        hasChildren: item.children && item.children.length > 0,
      }));

      const sortedRootItems = sortItems(rootItems);

      return res.json({
        success: true,
        path: rootPath,
        data: sortedRootItems,
      });
    }

    // Find the requested node in the tree
    const node = findNodeByPath(directoryTree, requestedPath);

    if (!node) {
      return res.status(404).json({
        success: false,
        error: "Path not found in directory tree",
      });
    }

    if (node.type !== "directory") {
      return res.status(400).json({
        success: false,
        error: "Path is not a directory",
      });
    }

    // Return children without their nested children
    const childItems = node.children.map((child) => ({
      id: child.id,
      name: child.name,
      path: child.path,
      type: child.type,
      hasChildren: child.children && child.children.length > 0,
    }));

    const sortedChildItems = sortItems(childItems);

    res.json({
      success: true,
      path: requestedPath,
      data: sortedChildItems,
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export { getDirectoryContents };
