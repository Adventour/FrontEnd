<template>
  <div>
    <div class="mt-3 mb-2">사진 업로드: {{ file1 ? file1.name : "" }}</div>
    <b-form-file
      class="mb-3"
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="파일 선택 후 drop"
      browse-text="파일 선택"
    ></b-form-file>
  </div>
</template>

<script>
export default {
  name: "FileInputItem",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
