<template>
  <div class="ms-3">
    <b-row>
      <b-col cols="9" align="left">
        <b>{{ comment.userId }}</b>
      </b-col>
      <b-col cols="1" align="right">
        <b-button
          variant="outline-danger"
          v-if="comment.userId === this.userId"
          @click="deleteReply"
          >삭제</b-button
        >
      </b-col>
      <b-col cols="2" align="left">
        {{ comment.registerTime }}
      </b-col>
    </b-row>
    <div class="text-left">
      {{ comment.content }}
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http";

export default {
  name: "BoardReplyItem",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userId"]),
  },
  props: {
    comment: Object,
  },
  created() {},
  methods: {
    async deleteReply() {
      await http.delete(`reply/list/${this.comment.replyId}`);
      this.$parent.getRelpies();
    },
  },
};
</script>

<style scoped></style>
