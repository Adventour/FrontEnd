<template>
  <div class="login-form mt-5" align="left">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="아이디" label-for="input-1">
        <b-form-input id="input-1" v-model="form.id" placeholder="아이디" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="비밀번호:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.pwd"
          placeholder="비밀번호"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">로그인</b-button>
    </b-form>
  </div>
</template>

<script>
import http from "@/api/http";
import Cookies from "js-cookie";
import { mapState, mapActions } from "vuex";

export default {
  name: "MemberLogin",
  computed: {
    ...mapState(["userId"]),
    maskedPassword() {
      return this.form.pwd.replace(/./g, "*");
    },
  },

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
    ...mapActions(["setUserId"]),
    async onSubmit(event) {
      event.preventDefault();
      await http.post(`/member/login`, this.form).then(({ data, status }) => {
        if (status === 200) {
          Cookies.set("accessToken", data.accessToken);
          this.setUserId(this.form.id);
          // alert("로그인 성공");
          this.$router.push({ name: "main" }).then(() => {
            location.reload();
          });
        } else if (status === 400) {
          alert("아이디, 비밀번호를 다시 확인해주세요");
        }
      });
      return null;
    },
  },
};
</script>

<style scoped>
.login-form {
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
}
</style>
