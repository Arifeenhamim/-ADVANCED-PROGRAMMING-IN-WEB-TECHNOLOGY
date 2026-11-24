// export default function DashboardPage() {
//   const teacherName = "Your Name";        // a normal JavaScript variable
//   const courses = ["Web Technologies", "Data Structures", "Algorithms"];

//   return (
//     <main className="p-10">
//       <h1 className="text-5xl font-bold">Welcome, {teacherName}!</h1>
//       <p className="mt-2 text-gray-600">You have {courses.length} courses.</p>

//       <ul className="mt-6 space-y-2">
//         {courses.map((course) => (
//           <li key={course} className="rounded-lg border p-4">
//             {course}
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }


const courses = [
  { id: 1, name: "Web Technologies", students: 40 },
  { id: 2, name: "Data Structures", students: 35 },
];

const semester = "Fall 2026";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="text-3xl font-bold">My Courses</h1>
      <h2 className="mt-1 text-lg text-gray-500">{semester}</h2>

      <p className="mt-4">
        First Course: <span className="font-semibold">{courses[0].name}</span>
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <p className="mt-1 text-sm text-gray-600">
              Number of Students: {course.students}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}