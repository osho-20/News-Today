import axios from "axios"
const getNews = (category = "general") => {
    const API_K = '878dc13949834f839c9584acfe1889b4';
    let NEWS_URL = 'https://newsapi.org/v2/top-headlines?country=us&category=' + category;
    NEWS_URL = NEWS_URL + '&apiKey=' + API_K;
    return axios.get(NEWS_URL)
}

export default getNews;
