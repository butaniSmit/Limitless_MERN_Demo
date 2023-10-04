import { useState } from "react";
import { FilterApi } from '../../pages/api/axiosRequest';
import SearchBar from './searchBar';
import Select2 from '../common/select';
import LoadingPage from "./loadingPage";

const DataTable = ({ loading, setLoading, roledata, Getdata, fieldName, renderUsersData, input, setInput, Users, setUsers, apiname, recordsPerPage, setTotalPages, setTotalReacodes, setDatalenght, page, setSorting, sorting, setPage, select, setSelect }) => {
    const [field, setField] = useState('');
    const isAscSorting = sorting.order === "asc";
    const futureSortingOrder = isAscSorting ? "desc" : "asc";
    const handleChange = (e) => {
        setField(e.target.name);
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const onChangeData = async (event) => {
        event.preventDefault();
        setSelect({ ...select, [event.target.name]: event.target.value });
        if (event.target.value !== '') {
            setLoading(true);
            setPage(1)
        }
    }

    const rolechangeData = async (event) => {
        event.preventDefault();
        setSelect({ ...select, [event.target.name]: event.target.value });
        if (event.target.value !== '') {
            setLoading(true);
            setPage(1)
        }
    }
    const filterData = async (e) => {
        e.preventDefault();
        const value = input.name || input.email || input.role || input.full_name || input.phone_number || input.date || input.description || input.subject || input.slug
        if (value !== '' && value !== undefined) {
            setLoading(true);
            const resp = await FilterApi(apiname, recordsPerPage, page, sorting.column, sorting.order, field, value);
            setUsers(resp.data.document);
            const totalPages = Math.ceil(resp.data.result / (recordsPerPage));
            setTotalPages(totalPages);
            setLoading(false)
            setTotalReacodes(resp.data.result);
            setDatalenght(resp.data.datalength);
        }
    };

    const keyEnter = (e) => {
        setPage(1);
        if (e.key === "Enter") {
            filterData(e);
        }
    }
    const sortTable = (newSorting) => {
        setSorting(newSorting);
        setPage(1)
    };
    const ResetData = () => {
        if (apiname === 'users') {
            setSelect('');
        }
        setSorting({ column: "", order: "" })
        setInput('');
    }
    return (
        <>
            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                {loading ? <LoadingPage /> : null}
                <div className="datatable-scroll">
                    <table id="user-list" className="table datatable-show-all dataTable no-footer" role="grid" aria-describedby="user-list_info">
                        <thead>
                            <tr className="heading" role="row">
                                <th width="5%" className="" >#</th>
                                {fieldName.map((item, index) => {
                                    return (
                                        <>
                                            <th width="20%" className={`sorting` && sorting.column === item.value && sorting.order === "desc" ? "sorting sorting_desc" : "sorting" && sorting.column === item.value && sorting.order === "asc" ? "sorting sorting_asc" : "sorting"}
                                                onClick={() => sortTable({ column: item.value, order: futureSortingOrder })} key={item.id}>
                                                {item?.name?.map((filedname) => {
                                                    return filedname
                                                })}
                                            </th>
                                        </>
                                    )
                                })}
                                {apiname === "users" ? (
                                    <>
                                        <th width="10%" className={`sorting` && sorting.column === "role" && sorting.order === "desc" ? "sorting sorting_desc" : "sorting" && sorting.column === "role" && sorting.order === "asc" ? "sorting sorting_asc" : "sorting"}
                                            onClick={() => sortTable({ column: "role", order: futureSortingOrder })}>Role
                                        </th>
                                        <th width="10%" className={`sorting` && sorting.column === "status" && sorting.order === "desc" ? "sorting sorting_desc" : "sorting" && sorting.column === "status" && sorting.order === "asc" ? "sorting sorting_asc" : "sorting"}
                                            onClick={() => sortTable({ column: "status", order: futureSortingOrder })}>Status
                                        </th></>)
                                    : null}
                                <th width="10%" className="ml-2" rowSpan={1} colSpan={1}>Action</th>
                            </tr>

                            <tr className="filter">
                                <td rowSpan={1} colSpan={1} ></td>
                                {fieldName.map((item, index) => {
                                    return (
                                        <td rowSpan={1} colSpan={1} key={index}>
                                            <SearchBar name={item.value} value={item.input} handleChange={handleChange} onKeyDown={keyEnter} />
                                        </td>
                                    )
                                })}
                                {apiname === "users" ?
                                    <>
                                        <td>
                                            <Select2
                                                style={{ width: "100%" }}
                                                className="form-control"
                                                defaultValue="Select Role"
                                                options={{ placeholder: "Select Role" }}
                                                data={roledata.map((item, index) => { return (item.role) })}
                                                name="role_id"
                                                onChange={rolechangeData}
                                                value={select.role_id || ""}
                                            />
                                        </td>
                                    </>
                                    : null}
                                {apiname === "users" ?
                                    <td rowSpan={1} colSpan={1}>
                                        <td>
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
                                        </td>
                                    </td>
                                    : null}
                                {apiname === "administrators" ?
                                    <td></td>
                                    : null}
                                <td rowSpan={1} colSpan={1}>
                                    <button onClick={filterData} className="btn filter-submit search-button-main"><i className="ph ph-magnifying-glass" /></button>
                                    <button onClick={ResetData} className="btn filter-cancel close-button-main" title="Reset"><i className="ph ph-x" /></button>
                                </td>
                            </tr>
                        </thead>
                        {Users?.length > 0 ? (
                            <tbody>
                                {Users &&
                                    Users.map((item, index) => {
                                        return renderUsersData({ item, index })
                                    })
                                }
                            </tbody>
                        ) :
                            (
                                <tbody>
                                    <tr className="odd">
                                        <td valign="top" colSpan="6" className="dataTables_empty">
                                            No data available in table
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
        </>
    )
}
export default DataTable;