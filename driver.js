import Tree from "./tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

// Create a visual tree in a structured format
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.root);
// tree.insert(10);
// prettyPrint(tree.root);
// tree.delete(67);
// prettyPrint(tree.root);
// console.log(tree.find(324));
// console.log(tree.levelOrder(tree.externalFunction));
// console.log(tree.inorder(tree.externalFunction));
// console.log(tree.preorder(tree.externalFunction));
console.log(tree.postorder(tree.externalFunction));
console.log(tree.depth(1));
