import axios from "axios";

export function getNews(category = "General") {
  const API_Key = "e89f42a3c4624cdfb79aa49f772fd0cf";
  const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
  return axios.get(`${API_Endpoint}&apikey=${API_Key}`);
  //   axios
  //     .get(`${API_Endpoint}&apikey=${API_Key}`)
  //     .then((response) => {
  //       console.log(response.data.articles);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
}
