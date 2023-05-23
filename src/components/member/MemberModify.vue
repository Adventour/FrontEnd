<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-4" label="이름:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.name" placeholder="이름" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="비밀번호:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.pwd"
          placeholder="비밀번호"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="비밀번호 확인:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.checkPwd"
          placeholder="비밀번호 확인"
          type="password"
        ></b-form-input>
        <ul style="color: red" v-if="form.pwd !== form.checkPwd">
          비밀번호가 일치하지 않습니다
        </ul>
      </b-form-group>

      <!-- TODO 도메인 추가 필요 -->

      <b-button type="submit" variant="primary">정보수정</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "MemberModify",
  data() {
    return {
      form: {
        name: "",
        pwd: "",
        checkPwd: "",
      },
      show: true,
    };
  },
  async created() {
    await axios
      .get("http://localhost/member/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((response) => {
        this.form = response.data;
      });
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.form.pwd !== this.form.checkPwd) {
        alert("비밀번호가 일치하지 않습니다");
      } else {
        await axios
          .put("http://localhost/member/", this.form, {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          })
          .then(() => {
            alert("수정이 완료되었습니다");
            this.$router.push({ name: "memberprofile" });
          });
      }
    },
  },
};
</script>

<style scoped></style>
