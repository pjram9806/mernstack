const express = require("express");
const app = express();

app.use(express.json());

const employees = [
  { id: 1, name: "Anandh", age: 25 },
  { id: 2, name: "Kiran", age: 35 },
];

/* create a new employee */
app.post('/create',(req,res)=>
{
    const {name} = req.body;
    const newEmp = {
        id:employees.length+1,name
    }

    employees.push(newEmp);
    res.status(201).json(newEmp)
})


/* get users*/

app.get("/getemployees", (req, res) => {
  res.json(employees);
});


/* getby id */
app.get("/getemployees/:id",(req,res)=>
{
    const employee = employees.find(e=>e.id === parseInt(req.params.id))
    if(!employee ) return res.status(404).json({msg:'Employee Not Found'});
    res.json(employee);
});


/* update user by id */
app.put('/emp/:id',(req,res)=>
{
    const employee = employees.find(e=>e.id === parseInt(req.params.id))
    if(!employee ) return res.status(404).json({msg:'Employee Not Found'});
    employee.name = req.body.name;
    res.json(employee);
});


/* delete emp by id */
app.delete('/emp/:id',(req,res)=>
{
    employees = employees.filter(e=>e.id !== parseInt(req.params.id));
    res.json({msg:''})
})



const HOSTNAME = "127.0.0.1",PORT = 7500;



app.listen(PORT, HOSTNAME, () => {
  console.log(`Server Started At ${HOSTNAME}:${PORT}`);
});
