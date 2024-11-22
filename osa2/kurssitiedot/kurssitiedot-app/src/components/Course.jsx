const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = ({part, exercises}) => {
  console.log("Part-component: " + part + "=" + exercises)
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  console.log('parts: ', parts)
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({parts}) => {

  const total = parts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.exercises
  }, 0) 

  return (
    <>
      <b>
        <p>
          Total of {total} exercises.
        </p>
      </b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course