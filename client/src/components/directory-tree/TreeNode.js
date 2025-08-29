import React, { useState } from "react";
import { ICONS } from "../../helpers/icons";
import "./TreeNode.css";

const TreeNode = ({
  node,
  onExpand,
  onNavigate,
  isExpanded = false,
  children = null,
  level = 0,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (node.type === "directory") {
      if (node.hasChildren && !isExpanded) {
        setIsLoading(true);
        try {
          await onExpand(node.path);
        } finally {
          setIsLoading(false);
        }
      } else if (isExpanded) {
        onExpand(node.path, true);
      }
    }
  };

  const handleDoubleClick = () => {
    if (node.type === "directory") {
      onNavigate(node.path);
    }
  };

  const getDirectoryOrFileOrLoadingIcon = () => {
    if (node.type === "file") {
      return ICONS.FILE;
    }

    if (isLoading) {
      return ICONS.LOADING;
    }

    if (node.hasChildren) {
      return isExpanded ? ICONS.DIRECTORY_OPEN : ICONS.DIRECTORY_CLOSED;
    }

    return ICONS.DIRECTORY_EMPTY;
  };

  const getExpandOrCollapseOrLoadingIcon = () => {
    if (node.type === "file" || !node.hasChildren) {
      return "";
    }

    if (isLoading) {
      return ICONS.LOADING;
    }

    return isExpanded ? ICONS.COLLAPSE : ICONS.EXPAND;
  };

  return (
    <div className="tree-node">
      <div
        className={`tree-node-content ${node.type}`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        title={
          node.type === "directory"
            ? "Click to expand/collapse, double-click to navigate"
            : node.name
        }
      >
        <span className="expand-icon">
          {getExpandOrCollapseOrLoadingIcon()}
        </span>
        <span className="node-icon">{getDirectoryOrFileOrLoadingIcon()}</span>
        <span className="node-name">{node.name}</span>
      </div>

      {isExpanded && children && (
        <div className="tree-node-children">{children}</div>
      )}
    </div>
  );
};

export default TreeNode;
