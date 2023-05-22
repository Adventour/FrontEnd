<template>
  <div>
    <div class="mt-3 mb-2">사진 업로드: {{ file ? file.name : "" }}</div>
    <b-form-file
      type="file"
      class="mb-3"
      v-model="file"
      :state="Boolean(file)"
      placeholder="파일 선택 후 drop"
      browse-text="파일 선택"
      @input="fileChange"
    ></b-form-file>
  </div>
</template>

<script>
export default {
  name: "FileInputItem",
  data() {
    return {
      file: null,
    };
  },
  created() {},
  methods: {
    fileChange() {
      this.$emit("file-selected", this.file);
    },
  },
};
</script>

<style scoped></style>
