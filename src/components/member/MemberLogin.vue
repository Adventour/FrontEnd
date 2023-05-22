<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="아이디" label-for="input-1">
        <b-form-input id="input-1" v-model="form.id" placeholder="아이디" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="비밀번호:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.pwd"
          placeholder="비밀번호"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">로그인</b-button>
    </b-form>
  </div>
</template>

<script>
import http from "@/api/http";
import Cookies from "js-cookie";

export default {
  name: "MemberLogin",
  data() {
    return {
      form: {
        id: "",
        pwd: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      http
        .post(`/member/login`, {
          id: this.form.id,
          pwd: this.form.pwd,
        })
        .then(({ data, status }) => {
          if (status === 200) {
            alert("로그인 성공");
            console.log(data);
            Cookies.set("accessToken", data.accessToken);
            console.log(Cookies.get("accessToken"));
            this.$router.push({ name: "main" });
          } else if (status === 400) {
            alert("아이디, 비밀번호를 다시 확인해주세요");
          }
        });
      return null;
    },
  },
};
</script>

<style scoped></style>
