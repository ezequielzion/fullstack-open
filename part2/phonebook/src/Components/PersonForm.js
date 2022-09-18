const PersonForm = ({ 
    handleSubmit,
    handleChange,
    nameValue,
    numberValue
}) => (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" onChange={handleChange} value={nameValue}/>
        </div>
        <div>
          number: <input name="number" onChange={handleChange} value={numberValue}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm