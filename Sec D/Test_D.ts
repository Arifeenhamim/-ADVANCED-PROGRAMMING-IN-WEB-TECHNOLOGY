interface IStudent {
    name: string;
    age: number;
    grade: number;
}

let studentName: string = "Hamim";
let studentAge: number = 26;
let studentGrade: number = 3.90;

console.log("Name:", studentName);
console.log("Age:", studentAge);
console.log("Grade:", studentGrade);

let num1: number = 10;
let num2: number = 20;
let sum: number = num1 + num2;

console.log("Sum:", sum);

let a: number = 10;
let b: number = 20;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);

function getStudentName(): string {
    return "Hamim";
}

function getStudentAge(): number {
    return 26;
}

function getStudentGrade(): number {
    return 3.90;
}

function getStudentInfo(): IStudent {
    const student: IStudent = {
        name: getStudentName(),
        age: getStudentAge(),
        grade: getStudentGrade()
    };

    console.log("Student Name:", student.name);
    console.log("Student Age:", student.age);
    console.log("Student Grade:", student.grade);
    console.log("Normal Function");

    return student;
}

async function getStudentInfoAsync(): Promise<IStudent> {
    const student: IStudent = {
        name: getStudentName(),
        age: getStudentAge(),
        grade: getStudentGrade()
    };

    console.log("Student Name:", student.name);
    console.log("Student Age:", student.age);
    console.log("Student Grade:", student.grade);
    console.log("Async Function");

    return student;
}

function fetchStudentInfo(): Promise<IStudent> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "Hamim",
                age: 26,
                grade: 3.90
            });
        }, 2000);
    });
}

function getStudentInfoWithInterface(): IStudent {
    const student: IStudent = {
        name: getStudentName(),
        age: getStudentAge(),
        grade: getStudentGrade()
    };

    console.log("Student Name:", student.name);
    console.log("Student Age:", student.age);
    console.log("Interface Function");

    return student;
}

async function main(): Promise<void> {
    getStudentInfo();

    await getStudentInfoAsync();

    getStudentInfoWithInterface();

    console.log("Fetching student information...");

    const student = await fetchStudentInfo();

    console.log("Student information received:");
    console.log(student);
}

main();
