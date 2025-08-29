import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import { directoryService } from "../../services/directoryService";
import "./DirectoryTree.css";
import { ICONS } from "../../helpers/icons";

const DirectoryTree = ({ currentPath, onNavigate }) => {
  const [treeData, setTreeData] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setExpandedNodes(new Set());
    loadDirectoryContents(currentPath);
  }, [currentPath]);

  const loadDirectoryContents = async (path) => {
    setLoading(true);
    setError(null);

    try {
      const response = await directoryService.getDirectoryContents(path);
      setTreeData(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load directory:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = async (nodePath, collapse = false) => {
    const newExpandedNodes = new Set(expandedNodes);

    if (collapse || expandedNodes.has(nodePath)) {
      newExpandedNodes.delete(nodePath);
      setExpandedNodes(newExpandedNodes);
      return;
    }

    try {
      const response = await directoryService.getDirectoryContents(nodePath);

      setTreeData((prevData) => {
        return updateTreeWithChildren(prevData, nodePath, response.data || []);
      });

      newExpandedNodes.add(nodePath);
      setExpandedNodes(newExpandedNodes);
    } catch (err) {
      setError(`Failed to expand ${nodePath}: ${err.message}`);
      console.error("Failed to expand node:", err);
    }
  };

  const updateTreeWithChildren = (treeData, parentPath, children) => {
    return treeData.map((node) => {
      if (node.path === parentPath) {
        return { ...node, children: children };
      }

      if (node.children) {
        return {
          ...node,
          children: updateTreeWithChildren(node.children, parentPath, children),
        };
      }

      return node;
    });
  };

  const renderTreeNodes = (nodes, level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes.has(node.path);
      const children =
        node.children && isExpanded
          ? renderTreeNodes(node.children, level + 1)
          : null;

      return (
        <TreeNode
          key={node.id}
          node={node}
          onExpand={handleExpand}
          onNavigate={onNavigate}
          isExpanded={isExpanded}
          level={level}
        >
          {children}
        </TreeNode>
      );
    });
  };

  if (loading) {
    return (
      <div className="directory-tree loading">
        <div className="loading-message">
          <span className="loading-spinner">{ICONS.LOADING}</span>
          Loading directory contents...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="directory-tree error">
        <div className="error-message">
          <span className="error-icon">❌</span>
          <div>
            <strong>Error loading directory</strong>
            <p>{error}</p>
            <button onClick={() => loadDirectoryContents(currentPath)}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (treeData.length === 0) {
    return (
      <div className="directory-tree empty">
        <div className="empty-message">
          <span className="empty-icon">📂</span>
          This directory is empty
        </div>
      </div>
    );
  }

  return (
    <div className="directory-tree">
      <div className="tree-content">{renderTreeNodes(treeData)}</div>
    </div>
  );
};

export default DirectoryTree;
