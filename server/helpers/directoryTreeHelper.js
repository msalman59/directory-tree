// Helper function to find node in tree by path
function findNodeByPath(nodes, targetPath) {
  if (!nodes || !Array.isArray(nodes)) return null;

  const targetPathLower = targetPath.toLowerCase();

  for (const node of nodes) {
    if (node.path.toLowerCase() === targetPathLower) {
      return node;
    }

    if (node.children) {
      const childNode = findNodeByPath(node.children, targetPath);
      if (childNode) return childNode;
    }
  }

  return null;
}

export { findNodeByPath };
