import axios from "axios";
import Cookies from "js-cookie";

export async function AxiosRequest(url, method, headers, params) {
    return params ? axios({
        url: url,
        method: method,
        headers: headers,
        data: params
    }) :
        axios({
            url: url,
            method: method,
            headers: headers,
            data: {}
        })
}
export const LoginDetails = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/login`, "POST", headers, data)
}

export const SignupDetails = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/signup`, "POST", headers, data)
}


export const ForgotPasswordAPi = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/forgotpassword`, "POST", headers, data)
}


export const ResetPasswordAPi = (data, token) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/resetpassword/${token}`, "PATCH", headers, data)
}
export const RoleGetApiDetails = () => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/roles`, "GET", headers, {})
}

export const PostApiDetails = (data, apiname) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}`, "POST", headers, data);
}

export const GetDetailsById = (id, apiname) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}/${id}`, "GET", headers, {})
}

export const DeleteApiDetails = (id, username) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${username}/${id}`, "DELETE", headers, {})
}

export const UpdateApiDetails = (data, id, apiname) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}/${id}`, "PATCH", headers, data)
}


export const Api = (apiname, recordsPerPage, page, column, order) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&sort=${column}&orderby=${order}`, "GET", headers, {})
}

export const userApi = (apiname, recordsPerPage, page, column, order,value) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&sort=${column}&orderby=${order}&name=${value}`, "GET", headers, {})
}

export const FilterApi = (apiname, recordsPerPage, page, column, order, field, value) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&sort=${column}&orderby=${order}&name=${value}`, "GET", headers, {})
}

export const RoleSelectApi = (apiname,recordsPerPage, page, value) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&name=${value}`, "GET", headers, {})
}

//Account Setting
export const GetDataAccountUser = (data) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/updatePersonalInfo`, "PATCH", headers, data)
}
export const GetAccountUserDetails = () => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/account`, "GET", headers, {})
}

export const GetChangeAvatarDetails = (data) => {
    const headers = {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/change-avatar`, "PATCH", headers, data)
}

export const GetChangePasswordDetails = (data) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password`, "PATCH", headers, data)
}

export const SelectApi = (apiname,recordsPerPage,page,value) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/${apiname}?limit=${recordsPerPage}&page=${page}&name=${value}`, "GET", headers, {})
}

export const GetDashboardDetails = () => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('AuthToken')}`
    }
    return AxiosRequest(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/counters`, "GET", headers, {})
}