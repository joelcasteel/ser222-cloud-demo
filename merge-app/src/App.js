import React, {Component} from 'react';

import "./App.css";


class App extends Component {

  state = {
    values: null,
    submitted: false,

    splitValues: [],
    splitting: false,
    merging: false,
    history: []
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
    this.setState({
      submitted: true,
      splitValues: [this.state.values],
      splitting: true,
      merging: false
    });
  }

  onNextStep = event => {
    console.log(this.splitData());
    this.state.history.push(this.splitData());


    if(this.state.splitting) {
      let splitValues = this.state.splitValues;
      let newSplit = [];
      let done = true;
      splitValues.forEach((set) => {


        //Thanks to: https://bit.ly/3tL8WLT
        let half = Math.ceil(set.length/2);
        
        let first = set.splice(0, half);
        if(first.length > 0) {
          done = first.length === 1 && done;
          newSplit.push(first);
        }

        let second = set.splice(-half);
        if(second.length > 0) {
          done = second.length === 1 && done;
          newSplit.push(second);
        }

      });

      this.setState({
        splitValues: newSplit,
        splitting: !done,
        merging: done,
      });
    } else {

      //Thanks to Vbyec's answer:
      //  https://stackoverflow.com/questions/31352141/how-do-you-split-an-array-into-array-pairs-in-javascript

      let pairs = this.state.splitValues.reduce((results, value, index, array) => {
        if(index % 2 === 0) {
          results.push(array.slice(index, index + 2));
        }
        return results;
      }, []);

      console.log(pairs);
      
      let newMerged = [];

      pairs.forEach((pair) => {
        if(pair.length > 1) {
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

  insertLoc = function(val, arr) {
    arr.splice(this.findInsertLoc(val, arr)+1, 0, val);
    return arr;

  }

  findInsertLoc = function(val, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(parseInt(arr[i]) > parseInt(val)) {
        return i - 1;
      }
    }
    return arr.length
    
  };

  valueField = () => {
    if(!this.state.submitted) {
      return (
        <div>
          <input type='text' pattern='^(?:\d+,\s?)*\d+$' size='100' onChange={this.onValueChanged}></input>
          <button onClick={this.onValueSubmit}>Submit</button>
        </div>
      );
    }
  }

  controlField = () => {
    if(this.state.submitted) {
    return (
      <button onClick={this.onNextStep}>Next Step</button>
    )} else {
      return;
    }
  }

  sortTable = () => {
    if(this.state.values !== null) {
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

  history = () => {
    return this.state.history.map((tab, i) => (
      <React.Fragment><br/>{tab}<br/></React.Fragment>
    ))
  }

  render() {
    return (
      <div>
        <h1>Merge Sort Demo</h1>
        {this.valueField()}
        <br/><br/>
        <div>
          {this.sortTable()}
        </div>
        <br/><br/>
        <div>
          {this.controlField()}
        </div>
        <br/>
        <div>
          {this.history()}
        </div>
        <div>
          {this.splitData()}
        </div>
      </div>
    );
  }
}

export default App;
