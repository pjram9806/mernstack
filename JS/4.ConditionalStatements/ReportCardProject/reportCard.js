let reportForm = document.getElementById("reportForm").addEventListener('submit',(e)=>{
    e.preventDefault();

let fullName = document.getElementById('studentName').value;
let firstSubject = parseInt(document.getElementById('mark1').value);
let secondSubject = parseInt(document.getElementById('mark2').value);
let thirdSubject = parseInt(document.getElementById('mark3').value);

let totalMarks = firstSubject+secondSubject+thirdSubject;

let avg = (totalMarks/3).toFixed(2);

let grade;

if(avg>=90) grade ='A+';
else if(avg>=80) grade = 'A';
else if(avg>=70) grade = 'B';
else if(avg>=60) grade = 'C';
else if(avg>=50) grade = 'D';
else grade = 'F'

document.getElementById('nameDisplay').innerText = `Report For ${fullName}`;
document.getElementById('totalMarks').innerText = totalMarks;
document.getElementById('avg').innerText = avg;
document.getElementById('grade').innerText = grade;
})


