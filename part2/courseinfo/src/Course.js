const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <h3>total of {sum} exercises</h3>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
    <>
        { parts.map((p) => <Part key={Math.random()} part={p}/>) }
    </>
)
        

const Course = ({course}) => {
    const excerciseSum = course.parts.reduce((prev, curr) =>
        prev + curr.exercises, 0
    )
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total sum={excerciseSum}/>
        </div>
    )
}

export default Course