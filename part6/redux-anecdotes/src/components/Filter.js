const Filter = () => {

    const handleOnChange = (newText) => {
        console.log(newText);

    }
    
    
    return (
        <>
            filter <input onChange={({ target }) => handleOnChange(target.value)}/>
        </>
    );
}
 
export default Filter;