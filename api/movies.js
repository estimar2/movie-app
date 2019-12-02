//axios르르 통해서 영화 데이터를 가져오는 function을 만들꺼임
// basd URl : https://api.themoviedb.org/3/                0
// get : movie/popular
// params : api_key=b431ba6f03980392bd531710f1fac895       0
// params : language=en-US                                 0
//https://api.themoviedb.org/3/movie/popular?api_key=b431ba6f03980392bd531710f1fac895&language=en-US&page=1
import axios from "axios";

//axios의 설정을 준다.
// 1)기본 URL
// 2) params 설정

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "b431ba6f03980392bd531710f1fac895",
    language: "en-US"
  }
});

export const movies = {
  getPopular: () => api.get("movie/popular"),
  getNowPlaying: () => api.get("movie/now_playing")
};
