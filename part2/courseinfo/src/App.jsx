const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Content = ({ course }) => {
  return (
    <div>
      <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
    </div>
  );
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ course }) => {
  return (
    <strong>
      Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
    </strong>
  )
}

const Course = ({ course }) => {
  return (
  <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App