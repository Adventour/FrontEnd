import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://backend",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
