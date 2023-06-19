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

  // Inorder traversal of BST
  inorder(root) {
    if (root !== null) {
      this.inorder(root.left);
      console.log(root.data);
      this.inorder(root.right);
    }
  }

  // Delete node from tree
  delete(root, k) {
    if (root === null) {
      return root;
    }

    // Recursive calls for the ancestors of the node to be deleted
    if (root.data > k) {
      root.left = this.delete(root.left, k);
      return root;
    } else if (root.data < k) {
      root.right = this.delete(root.right, k);
      return root;
    }

    // Reaches here when root is the node to be deleted

    // If root has no children, delete the root
    if (root.left === null && root.right === null) {
      root = null;
      return root;
    }

    // If one of the children is empty, replace root with existing child
    else if (root.left === null) {
      root = root.right;
      return root;
    } else if (root.right === null) {
      root = root.left;
      return root;
    }

    // If both children exist, find the successor, which will be the smallest
    // value (furthest left) in the right subtree of the root node to be deleted
    else {
      let successorParent = root;
      let successor = root.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // Delete the successor
      if (successorParent !== root) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }

      // Copy successor data to root
      root.data = successor.data;
      successor = null;
      return root;
    }
  }
}
