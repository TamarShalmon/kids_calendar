import axios from "axios"
import { toast } from "react-toastify"


const baseUrl = 'http://localhost:3001'
const apiReq = async ({ url, method, data, token }) => {


    try {
        const { data: res } = await axios({
            url: `${baseUrl}/${url}`,
            method,
            data,
            headers: { Authorization: `Bearer ${token}` }
        })

        return res
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || error.message || 'something went wrong')
    }
}

export default apiReq