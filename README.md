# Binary Search Trees
Run the test script in the console with `node driver.js`

This is an implementation of a balanced binary search tree with the following methods:
* `insert` - inserts a node with the given value into the tree
* `delete` - deletes a node with the given value from the tree
* `find` - returns the node with the given value
* `levelOrder` - traverses the tree in breadth-first level order
* `inorder` - traverses the tree in depth-first inorder
* `preorder` - traverses the tree in depth-first preorder
* `postorder` - traverses the tree in depth-first postorder
* `height` - returns the height of a given node (longest path between given node and leaf node)
* `depth` - returns the depth of a given node (path from given node to tree's root node)
* `isBalanced` - checks if the tree is balanced (difference between heights of left subtree and right subtree of each node is not more than 1)
* `rebalance` - rebalances an unbalanced tree