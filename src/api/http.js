import axios from "axios";
import Cookies from "js-cookie";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});
