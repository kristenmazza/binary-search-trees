import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.arr = this.sortArray(arr);
    this.root = this.buildTree(arr);
  }

  sortArray(arr) {
    // Remove duplicate values
    const array = [...new Set(arr)];
    // Sort array in ascending order
    array.sort((a, b) => a - b);
    return array;
  }

  // Take array of data and turn it into a balanced binary tree full of Node objects
  buildTree(currentArray = this.arr) {
    const arr = [...currentArray];
    // console.log(arr);
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1, arr.length));
    return node;
  }

  // Create a visual tree in a structured format
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // Insert value into tree
  insert(node, data) {
    if (node === null) {
      return new Node(data);
    }

    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      node.left = this.insert(node.left, data);
    } else if (data > node.data) {
      node.right = this.insert(node.right, data);
    }

    return node;
  }
}
