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

      <b-form-group id="input-group-3" label="비밀번호 확인:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.checkPwd"
          placeholder="비밀번호 확인"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="이름:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.name" placeholder="이름" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="이메일" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.email"
          placeholder="이메일"
          required
        ></b-form-input>
      </b-form-group>
      <!-- TODO 도메인 추가 필요 -->

      <b-button type="submit" variant="primary">회원가입</b-button>
    </b-form>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "MemberJoin",
  data() {
    return {
      form: {
        id: "",
        name: "",
        pwd: "",
        checkPwd: "",
        email: "",
        // domain: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      http
        .post(`/member/regist`, {
          id: this.form.id,
          name: this.form.name,
          pwd: this.form.pwd,
          email: this.form.email,
          domain: "test",
        })
        .then(({ status }) => {
          if (status === 200) {
            alert("회원가입 성공");
            this.$router.push({ name: "memberlogin" });
          } else {
            alert("회원가입 실패 ");
          }
        });

      // .alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style scoped></style>
