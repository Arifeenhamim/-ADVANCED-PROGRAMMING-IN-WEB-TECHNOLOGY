interface IStudent {
     name: string;
     age: number;
     grade?: number;
}

let name1: string = "Hamim";
let age1: number = 26;
let grade1: number = 3.90;

console.log("Name:", name1);
console.log("Age:", age1);
console.log("Grade:", grade1);

let num4: number = 10;
let num3: number = 20;
let sum2: number = num3 + num4;
console.log("Sum:", sum2);

let a: number = 10;
let b: number = 20;
console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);

function getName(): string {
    let name: string = "Hamim";
    return name;
}
function getAge(): number {
    return 26;
}
function getGrade(): number {
    return 3.00;
}
function getStudentInfo(): { name: string; age: number; grade: number } {
    const name: string = getName();
    const age: number = getAge();
    const grade: number = getGrade();
    console.log("Student Name:", name);
    console.log("Student Age:", age);
    console.log("Student Grade:", grade);
    console.log("Normal Function");
    return { name, age, grade };
}

async function getStudentInfo2(): Promise<{ name: string; age: number; grade: number }> {
    const name: string = await getName();
    const age: number = await getAge();
    const grade: number = await getGrade();
    console.log("Student Name:", name);
    console.log("Student Age:", age);
    console.log("Student Grade:", grade);
    console.log("Async Function");
    return { name, age, grade };
}

function getStudentData3():IStudent {
    const name: string = getName();
    const age: number = getAge();
    const grade: number = getGrade();
    console.log("Student Name:", name);
    console.log("Student Age:", age);
    console.log("Interface Function");
    // console.log("Student Grade:", grade);
    return { name, age };
}

async function main(){
    getStudentInfo();
   await getStudentInfo2();
    getStudentData3();
}
main();