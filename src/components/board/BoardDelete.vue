<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";

export default {
  name: "BoardDelete",
  created() {
    http.delete(`/board/list/${this.$route.params.articleNo}`).then(({ status }) => {
      let msg = "삭제 처리시 문제가 발생했습니다.";
      if (status === 200) {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "boardlist" });
    });
  },
};
</script>

<style></style>
