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
        console.log(error);
        toast.error(error.message || 'something went wrong', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }
}

export default apiReq