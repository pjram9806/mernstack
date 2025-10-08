import React,{Component} from "react";

class Increment extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            count:0
        }
    }

    incrementCount = ()=>
        {
            this.setState((prevState)=>({count:prevState.count+1}));
        }
    decrementCount = ()=>
        {
            this.setState((prevState)=>({count:prevState.count > 0 ?prevState.count-1:0}))
        }
    render() {
        return (
             <React.Fragment>
                <div className="col-md-6 mx-2 py-2">
                         <div className="card ">
                    <div className="card-body">
                        <h2>{this.state.count}</h2>
                        <button className="btn btn-sm btn-danger" onClick={this.incrementCount}>Increment</button>
                        <button className="btn btn-sm btn-primary" onClick={this.decrementCount}>Decrement</button>
                    </div>
                 
                </div>
                </div>
             </React.Fragment>
        );
    }
}

export default Increment