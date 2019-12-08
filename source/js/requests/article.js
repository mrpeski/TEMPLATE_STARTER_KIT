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

export const getArticles = (page = 1, size = 6) => {
    return axios.get(api.article.get.all(page, size))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const getArticle = (id) => {
    return axios.get(api.article.get.single(id))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const postArticle = (payload) => {
    return axios.post(api.article.post.default(), payload)
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const postArticleWithImage = (payload, fileKey) => {
    let fileZ = payload[fileKey];
    let formData = new FormData();
    formData.append('file', fileZ);
    delete payload[fileKey];
    return axios({
            method: 'post',
            url: api.article.post.withImage(),
            params: {
                articleJsonString: payload
            },
            data: formData,
            headers: {'Content-Type': 'multipart/form-data', accept: '*/*'}
        })
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const putArticle = (payload) => {
    return axios.put(api.article.put(), payload)
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const putArticleWithImage = (payload, fileKey) => {
    let fileZ = payload[fileKey];
    let formData = new FormData();
    formData.append('file', fileZ);
    delete payload[fileKey];
    return axios({
        method: 'put',
        url: api.article.put.withImage(),
        params: {
            articleJsonString: payload
        },
        data: formData,
        headers: {'Content-Type': 'multipart/form-data', accept: '*/*'}
    })
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const deleteArticle = id => {
    return axios.delete(api.article.delete(id))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const getArticlesByType = (type = 0, page = 1, size = 3) => {
    return axios.get(api.article.get.articles_by_type(type, page, size))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};



export const getArticleTypes = (page = 1, size = 6) => {
    return axios.get(api.articleTypes.get(page, size))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};