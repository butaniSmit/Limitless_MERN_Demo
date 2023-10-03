import Select2 from "./select";
const SearchBar = ({ value, name, handleChange, onKeyDown }) => {
    return (
        <input
            type='text'
            className='form-control form-filter input-sm'
            value={value || ''}
            name={name}
            onChange={handleChange}
            onKeyDown={onKeyDown}
        />
    )
}
export default SearchBar;
export const selectStatus = ({ onChangeData,select }) => {
    return (
        <Select2
            style={{ width: "100%" }}
            className="form-control"
            defaultValue="Select Status"
            options={{ placeholder: "Select Status" }}
            data={[
                { id: '', text: "Select Status" },
                { id: 1, text: "Active" },
                { id: 0, text: "Inactive" },
            ]}
            name="status"
            onChange={onChangeData}
            value={select.status || ""}
        />
    )
}