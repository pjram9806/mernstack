import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
  };

 //function
  Increment = ()=>
 {
    this.setState({count:this.state.count+1})
 }

 Decrement = ()=>
 {
    this.setState({count:this.state.count> 0 ?this.state.count-1:0})
 }


  render() {
    return (
      <React.Fragment>
        <div className="container my-3">
          <div className="row">
            <div className="col-4">
              <div className="card bg-info">
                <div className="card-header">
                  <h3>Counter</h3>
                </div>
                <div className="card-body">
                  <button className="btn btn-sm btn-primary" onClick={this.Increment}>Increment</button>
                  <button className="btn btn-sm btn-secondary" onClick={this.Decrement}>
                    Decrement
                  </button>
                </div>
                <div className="card-footer">
                  <p className="text-success">Result:{this.state.count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Counter;
