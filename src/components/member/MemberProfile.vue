<template>
  <div>
    <b-form>
      <b-form-group id="input-group-1" label="아이디" label-for="input-1">
        <b-form-input
          id="input-1"
          class="profile"
          :readonly="true"
          v-model="form.id"
          placeholder="아이디"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="이름:" label-for="input-4">
        <b-form-input
          id="input-4"
          class="profile"
          :readonly="true"
          v-model="form.name"
          placeholder="이름"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="이메일" label-for="input-5">
        <b-form-input
          id="input-5"
          class="profile"
          :readonly="true"
          v-model="form.email"
          placeholder="이메일"
          required
        ></b-form-input>
      </b-form-group>
      <!-- TODO 도메인 추가 필요 -->

      <b-button @click="modify" variant="primary">수정</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "MemberProfile",
  data() {
    return {
      form: {
        id: "",
        name: "",
        email: "",
        // domain: "",
      },
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
    modify() {
      this.$router.push({ name: "membermodify" });
    },
  },
};
</script>

<style scoped></style>
