import React,{Component} from "react";

class Student extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            name:'Santhosh'
        }
    }
    render() {
        return (
             <React.Fragment>
                <div className="col-md-6 my-3 px-2">
                    <div className="card">
                    <div className="container">
                        <h2>My Name is {this.state.name}</h2>
                    </div>
                </div>
                </div>
             </React.Fragment>
        );
    }
}

export default Student;