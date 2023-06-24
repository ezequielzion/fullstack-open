import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleOnChange = (newText) => {
        dispatch(filterChange(newText))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={({ target }) => handleOnChange(target.value)}/>
        </div>
    );
}
 
export default Filter;
