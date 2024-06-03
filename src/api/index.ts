import axios from "axios";

const { baseURL } = require("./config");

export const loginSignup = (email: string,password:string) => {
    return axios.post(`${baseURL}/add-user?email=${email}&password=${password}`);
};
export const getUserInfo = (payload: { email: any; }) => {
    const email = payload.email;
    return axios.get(`${baseURL}/get-user?email=${email}`);
};
// 添加频道
export const addChannel = (payload: any) => {
    const email = (JSON.parse(localStorage.getItem("yt-assistant-auth") || '""') || {})
        .email;
    return axios.post(
        `${baseURL}/add-channel`,
        Object.assign(payload, { email })
    );
};
export const queryChannel = ({ keyword, channelLink }: {
    keyword: string,
    channelLink: string
}) => {
    return axios.get(
        `${baseURL}/query-channel?keyword=${keyword}&channel-link=${channelLink}`
    );
};

export const getDbChannelVideos = (channel_id: string) => {
    return axios.get(
        `${baseURL}/get-channel-videos?channel_id=${channel_id}`
    );
}


export const writeViewedVideoId = (payload: { viewed_video_ids: any; email: any; }) => {
    return axios.post(`${baseURL}/write-viewed-video_id?viewed_video_ids=${payload.viewed_video_ids}&email=${payload.email}`)
}