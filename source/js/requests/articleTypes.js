import axios from "axios";
import { api } from "./routes";
import { toast } from "react-toastify";


function handleSuccessResponse(response) {
    const { message } = response;
    // console.log(response);
    toast.success(message);
    return response.data.data;
}

function handleFailureResponse(err) {
    if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
    } else if (err.request) {
        toast.error("Server appears to be down");
    } else {
        console.log("err", err);
    }
}

export const getArticleTypes = () => {
    return axios.get(api.articleTypes.get.all())
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const getArticleType = (id) => {
    return axios.get(api.articleTypes.get.single(id))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const postArticleType = (payload) => {
    return axios.post(api.articleTypes.post(), payload)
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};
export const putArticleType = (payload) => {
    return axios.put(api.articleTypes.put(), payload)
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const deleteArticleType = id => {
    return axios.delete(api.articleTypes.delete(id))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};