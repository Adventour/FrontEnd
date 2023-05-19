<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
      <!-- <b-button type="reset" variant="danger">초기화</b-button> -->
    </b-form>
  </div>
</template>

<script>
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
};
</script>

<style scoped></style>
