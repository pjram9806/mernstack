let employees = [
    {name:'krishna',salary:35000},
    {name:'harish',salary:45000}
]


let newSalaries = employees.map(emp => {
    return {
        ...emp,
        salary:emp.salary*1.20
    }
});

console.log(newSalaries);