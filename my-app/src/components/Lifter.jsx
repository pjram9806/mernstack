import React, { useState } from "react";

let Lifter = () => {
  let [count, setCount] = useState(0);
  return (
    <React.Fragment>
      <div className="container my-3">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                <h3>Counter</h3>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setCount(count + 1)}
                >
                  Increment
                </button>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => setCount(count - 1)}
                >
                  Decrement
                </button>
              </div>
              <div className="card-footer">
                <p className="text-success">Result:{count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Lifter;
