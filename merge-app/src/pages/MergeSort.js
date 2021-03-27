import React, { Component } from 'react';

import "../App.css";


class BST {
    constructor(val) {
        this.root = null;
        this.value = val;
        this.left = null;
        this.right = null;

        console.log(this.value);
    }

    split = function () {

        console.log(this.value);
        if (this.value) {
            let half = Math.ceil(this.value.length / 2);

            let first = this.value.splice(0, half);
            if (first.length > 0) {
                this.left = new BST(first);
                this.left.root = this;
            }

            let second = this.value.splice(-half);
            if (second.length > 0) {
                this.right = new BST(second);
                this.right.root = this;
            }
            this.value = null;
        } else {
            if (this.left) {
                this.left.split();
            }
            if (this.right) {
                this.right.split();
            }
        }
        console.log(this);
    }

    merge = function () {
        if (this.left !== null) {
            if (this.left.left === null) {
                this.combine();
            } else {
                this.left.merge();

                if (this.right !== null) {
                    this.right.merge();
                }
            }
        }
    }

    combine = function () {
        if (this.left !== null && this.right !== null) {
            for (let i in this.left.value) {
                this.insertLoc(this.left.value[i], this.right.value);
            }
            this.value = this.right.value;
            this.left = null;
            this.right = null;
        } else if (this.left !== null) {
            this.value = this.left.value;
            this.left = null;
        } else if (this.right !== null) {
            this.value = this.right.value;
            this.right = null;
        }
    }

    insertLoc = function (val, arr) {
        arr.splice(this.findInsertLoc(val, arr) + 1, 0, val);
        return arr;

    }

    findInsertLoc = function (val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i]) > parseInt(val)) {
                return i - 1;
            }
        }
        return arr.length

    };

}

class MergeSort extends Component {

    state = {
        values: null,
        submitted: false,

        splitValues: [],
        splitting: false,
        merging: false,
        history: [],
        tree: null,
    };

    onValueChanged = event => {
        let entered = event.target.value.replace(' ', '').split(',').filter((val) => {
            return !isNaN(parseInt(val));
        });

        this.setState({
            values: entered
        });
    }

    onValueSubmit = event => {
        let vals = this.state.values.slice();


        this.setState({
            submitted: true,
            splitValues: [this.state.values],
            splitting: true,
            merging: false,
            tree: new BST(vals)
        });
    }

    onNextStep = event => {
        console.log(this.splitData());
        this.state.history.push(this.treeData());


        if (this.state.splitting) {
            let splitValues = this.state.splitValues;
            let newSplit = [];
            let done = true;
            splitValues.forEach((set) => {


                //Thanks to: https://bit.ly/3tL8WLT
                let half = Math.ceil(set.length / 2);

                let first = set.splice(0, half);
                if (first.length > 0) {
                    done = first.length === 1 && done;
                    newSplit.push(first);
                }

                let second = set.splice(-half);
                if (second.length > 0) {
                    done = second.length === 1 && done;
                    newSplit.push(second);
                }

            });
            console.log("SPlitting")
            this.state.tree.split();
            this.setState({
                splitValues: newSplit,
                splitting: !done,
                merging: done,
            });
        } else {
            if(this.state.tree.left !== null && this.state.tree.right !== null) {
                this.state.tree.merge();
            }

            //Thanks to Vbyec's answer:
            //  https://stackoverflow.com/questions/31352141/how-do-you-split-an-array-into-array-pairs-in-javascript

            let pairs = this.state.splitValues.reduce((results, value, index, array) => {
                if (index % 2 === 0) {
                    results.push(array.slice(index, index + 2));
                }
                return results;
            }, []);

            console.log(pairs);

            let newMerged = [];

            pairs.forEach((pair) => {
                if (pair.length > 1) {
                    pair[0].forEach((value) => {
                        this.insertLoc(value, pair[1]);
                    });
                    newMerged.push(pair[1]);
                } else {
                    newMerged.push(pair[0]);
                }


            })

            console.log(newMerged);

            this.setState({
                splitValues: newMerged
            })
        }
    }

    split = function (node) {

        let newNode = new BST(null);
        if (node.value === null) {
            if (node.left !== null) {
                this.split(node.left);
            }
            if (node.right !== null) {
                this.split(node.right);
            }
            return;
        }
        console.log("HEYYY");
        console.log(node.value);
        let half = Math.ceil(node.value.length / 2);

        let first = node.value.splice(0, half);
        if (first.length > 0) {
            console.log(first);
            newNode.left = new BST(first);
        }

        let second = node.value.splice(-half);
        if (second.length > 0) {
            console.log(second);
            newNode.right = new BST(second);
        }

        node.value = null;

        this.setState({
            tree: newNode
        });
    }

    insertLoc = function (val, arr) {
        arr.splice(this.findInsertLoc(val, arr) + 1, 0, val);
        return arr;

    }

    findInsertLoc = function (val, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (parseInt(arr[i]) > parseInt(val)) {
                return i - 1;
            }
        }
        return arr.length

    };

    valueField = () => {
        if (!this.state.submitted) {
            return (
                <div>
                    <input type='text' pattern='^(?:\d+,\s?)*\d+$' size='100' onChange={this.onValueChanged}></input>
                    <button onClick={this.onValueSubmit}>Submit</button>
                </div>
            );
        }
    }

    controlField = () => {
        if (this.state.submitted) {
            return (
                <button onClick={this.onNextStep}>Next Step</button>
            )
        } else {
            return;
        }
    }

    sortTable = () => {
        if (this.state.values !== null) {
            return (
                <table>
                    <tbody>
                        {this.tableData()}
                    </tbody>
                </table>
            );
        }
    };

    tableData = () => {
        return (
            <tr>
                {this.state.values.map((value, idx) => (
                    <td key={idx}>{value}</td>
                ))}
            </tr>
        );
    }

    splitData = () => {
        return (
            <table><tbody><tr>
                {this.state.splitValues.map((arr, i) => (
                    <td><table className="parent">
                        <tbody>
                            {arr.map((val, j) => (
                                <td>{val}</td>
                            ))}
                        </tbody>
                    </table>
                    </td>
                ))}
            </tr></tbody></table>
        );
    }

    treeData = () => {
        if (this.state.tree) {
            return (
                <table>
                    <tbody>
                        <tr>
                            {this.renderTree(this.state.tree)}
                        </tr>
                    </tbody>
                </table>
            );
        } else {
            return (
                <table>
                    <tbody>
                        <tr>
                        </tr>
                    </tbody>
                </table>
            )
        }
    }

    renderTree = function (node) {
        if (node.value !== null) {
            return (
                <td>{this.renderLeaf(node.value)}</td>
            )
        } else {
            let result = null;
            if (node.left !== null && node.right !== null) {
                return (
                    <React.Fragment>
                        {this.renderTree(node.left)}
                        {this.renderTree(node.right)}
                    </React.Fragment>
                )
            } else if (node.left !== null) {
                return this.renderTree(node.left);
            } else if (node.right !== null) {
                return this.renderTree(node.right);
            }
        }
    }

    renderLeaf = function (value) {
        return (
            <table>
                <tbody>
                    <tr>
                        {value.map((val, i) => (
                            <td>{val}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        )
    }

    history = () => {
        return this.state.history.map((tab, i) => (
            <React.Fragment><br />{tab}<br /></React.Fragment>
        ))
    }

    render() {
        return (
            <div>
                <h1>Merge Sort Demo</h1>
                {this.valueField()}
                <br /><br />
                <div>
                    {this.sortTable()}
                </div>
                <br /><br />
                <div>
                    {this.controlField()}
                </div>
                <br />
                <div>
                    {this.history()}
                </div>
                <div>
                    {this.treeData()}
                </div>
            </div>
        );
    }
}

export default MergeSort;
