const Persons = ({persons, search, handleDelete}) => persons.map((p) => {
    if(p.name.toLowerCase().includes(search.toLowerCase())){
        return (
            <div key={p.name}>
                <p>{p.name} {p.number}</p>
                <button onClick={() => handleDelete(p)}>delete</button>
            </div>
        )
    }
})

export default Persons