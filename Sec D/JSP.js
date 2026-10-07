function getStudentData() {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const success = true;

      if (success) {

        resolve({
          id: 101,
          name: "Rahim",
          cgpa: 3.92
        });

      } else {

        reject("Failed to get student data");

      }

    }, 2000);

  });
}

async function displayStudent() {

  try {

    const student = await getStudentData();

    console.log(student);

  } catch (error) {

    console.log(error);

  }

}

// function main(){
//   displayStudent();
// }

//  main();

