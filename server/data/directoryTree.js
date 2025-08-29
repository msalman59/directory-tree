const directoryTree = [
  {
    id: 1,
    name: "README.md",
    path: "/README.md",
    type: "file",
  },
  {
    id: 2,
    name: "Documents",
    path: "/Documents",
    type: "directory",
    children: [
      {
        id: 3,
        name: "Word.doc",
        path: "/Documents/Word.doc",
        type: "file",
      },
      {
        id: 4,
        name: "Powerpoint.ppt",
        path: "/Documents/Powerpoint.ppt",
        type: "file",
      },
    ],
  },
  {
    id: 5,
    name: "Downloads",
    path: "/Downloads",
    type: "directory",
    children: [
      {
        id: 6,
        name: "unnamed.txt",
        path: "/Downloads/unnamed.txt",
        type: "file",
      },
      {
        id: 7,
        name: "Misc",
        path: "/Downloads/Misc",
        type: "directory",
        children: [
          {
            id: 8,
            name: "foo.txt",
            path: "/Downloads/Misc/foo.txt",
            type: "file",
          },
          {
            id: 9,
            name: "bar.txt",
            path: "/Downloads/Misc/bar.txt",
            type: "file",
          },
        ],
      },
    ],
  },
];

const rootPath = "/";

export { directoryTree, rootPath };
