import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  // Build tree using sorted, unique values array
  buildTree(arr) {
    const uniqueArray = this.removeDuplicates(arr);
    const sortedArray = this.sortArray(uniqueArray);
    const root = this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
    return root;
  }

  // Remove array duplicates
  removeDuplicates(arr) {
    const uniqueValues = [...new Set(arr)];
    return uniqueValues;
  }

  // Sort array in ascending order
  sortArray(arr) {
    const sorted = arr.sort((a, b) => a - b);
    return sorted;
  }

  // Turn sorted array into binary search tree
  sortedArrayToBST(arr, start, end) {
    if (start > end) {
      return null;
    }

    // Make middle element the root
    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    // Recursively construct left and right subtrees
    node.left = this.sortedArrayToBST(arr, start, mid - 1);
    node.right = this.sortedArrayToBST(arr, mid + 1, end);

    return node;
  }

  // Insert value into tree
  insert(data, node = this.root) {
    if (node === null) {
      node = new Node(data);
      return node;
    }

    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      node.left = this.insert(data, node.left);
    } else if (data > node.data) {
      node.right = this.insert(data, node.right);
    }

    return node;
  }

  // Delete node from tree
  delete(k, root = this.root) {
    if (root === null) {
      return root;
    }

    // Recursive calls for the ancestors of the node to be deleted
    if (root.data > k) {
      root.left = this.delete(k, root.left);
      return root;
    } else if (root.data < k) {
      root.right = this.delete(k, root.right);
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

  // Find value in BST and return node
  find(value, root = this.root) {
    if (root === null || root.data === value) {
      return root;
    }

    if (root.data < value) {
      return this.find(value, root.right);
    } else if (root.data > value) {
      return this.find(value, root.left);
    }
  }

  externalFunction(node) {
    return node.data * node.data;
  }

  // levelOrder traverses tree in breadth-first level order and provides each
  // node as the argument to the provided function. Returns array of values if
  // no function is given.
  levelOrder(callback, root = this.root) {
    if (root === null) return;
    let q = [];
    q.push(root);
    let levelOrderArray = [];

    // While the queue array is not empty
    while (q.length > 0) {
      let current = q[0];

      // If a left node exists and a right node exixts, push those nodes into the queue
      if (current.left) q.push(current.left);
      if (current.right) q.push(current.right);

      // Store and remove first node from the queue
      let shiftedNode = q.shift();

      // Provide each node as an argument to the provided function, if it exists.
      if (callback) {
        levelOrderArray.push(callback(shiftedNode));
      } else {
        levelOrderArray.push(shiftedNode.data);
      }
    }
    return levelOrderArray;
  }

  // Inorder traversal of BST: <left><root><right>
  // Accepts a function as a parameter. Returns array if no function is given.
  inorder(callback, root = this.root, inorderArray = []) {
    if (root === null) return;

    this.inorder(callback, root.left, inorderArray);

    if (callback) {
      inorderArray.push(callback(root));
    } else {
      inorderArray.push(root.data);
    }

    this.inorder(callback, root.right, inorderArray);

    return inorderArray;
  }

  // Preorder traversal of BST: <root><left><right>
  // Accepts a function as a parameter. Returns array if no function is given.
  preorder(callback, root = this.root, preorderArray = []) {
    if (root === null) return;

    if (callback) {
      preorderArray.push(callback(root));
    } else {
      preorderArray.push(root.data);
    }

    this.preorder(callback, root.left, preorderArray);
    this.preorder(callback, root.right, preorderArray);

    return preorderArray;
  }

  // Postorder traversal of BST: <left><right><root>
  // Accepts a function as a parameter. Returns array if no function is given.
  postorder(callback, root = this.root, postorderArray = []) {
    if (root === null) return;

    this.postorder(callback, root.left, postorderArray);
    this.postorder(callback, root.right, postorderArray);

    if (callback) {
      postorderArray.push(callback(root));
    } else {
      postorderArray.push(root.data);
    }

    return postorderArray;
  }
}
