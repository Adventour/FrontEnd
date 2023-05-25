import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://3.35.252.74:8080",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
