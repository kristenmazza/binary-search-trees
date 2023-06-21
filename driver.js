import Tree from "./tree.js";

// Create array of random numbers between 0-100
function randomNumbers(n) {
  let array = [];
  let min = 0;
  let max = 100;

  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * (max - min) + min));
  }

  return array;
}

const arr = randomNumbers(17);
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

// Tests
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
tree.insert(144);
tree.insert(131);
tree.insert(143);
tree.insert(101);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
