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

export const getFeeds = (page = 1, size = 6) => {
    return axios.get(api.feed.get.all(page, size))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const getFeed = (id) => {
    return axios.get(api.feed.get.single(id))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const postFeed = (payload) => {
    return axios.post(api.feed.post(), payload)
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};
export const putFeed = (payload) => {
    return axios.put(api.feed.put(), payload)
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};

export const deleteFeed = id => {
    return axios.delete(api.feed.delete(id))
        .then(handleSuccessResponse)
        .catch(handleFailureResponse);
};