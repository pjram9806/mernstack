import React ,{Component} from "react";

class Counter extends Component {
    state = 
    { count:0 } 

    //function
    Increment = ()=>
    {
        this.setState({count:this.state.count+1})
    }

    Decrement = ()=>
    {
        this.setState({count:this.state.count === 0  ? 1:0})
    }

    render() { 
        return (
            <React.Fragment>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                               <div className="card-header">
                                 <h3>Counter</h3>
                               </div>
                            </div>
                            <div className="card-body">
                                <div className="btn btn-sm btn-primary" onClick={this.Increment}>Increment</div>
                                <div className="btn btn-sm btn-danger" onClick={this.Decrement}>Decrement</div>
                            </div>
                            <div className="card-footer">
                                <p className="h4 text-success">Result:{this.state.count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Counter;