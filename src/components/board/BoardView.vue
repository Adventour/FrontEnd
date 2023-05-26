<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userId === article.userId">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          align="left"
          :header-html="`<h3 style='font-size: 3rem'>${article.subject}</h3>
          <div align='right'><h4>${article.userId}</div>
          <div align='right'>조회수: ${article.hit}</div>
          <div align='right'>${article.registerTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <b-img
              class="mb-3"
              v-if="article.saveFile !== null"
              :src="article.saveFile"
              style="max-width: 400px; max-height: 300px"
            ></b-img>
            <hr />
            <div v-html="message" style="font-size: 1.5rem"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- 댓글 start -->
    <div>
      <b-input-group class="mt-3 mb-3">
        <b-form-input v-model="reply"></b-form-input>
        <b-input-group-append>
          <b-button variant="warning" @click="createReply"><b>댓글 작성</b></b-button>
        </b-input-group-append>
      </b-input-group>
      <b-card class="mb-3" style="height: 300px; overflow-y: scroll">
        <!-- <div v-for="comment in comments" :key="comment.replyId" class="d-flex"> -->
        <board-reply-item
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
        ></board-reply-item>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import http from "@/api/http";
import BoardReplyItem from "./item/BoardReplyItem.vue";
import { mapState } from "vuex";

export default {
  components: { BoardReplyItem },
  name: "BoardDetail",
  data() {
    return {
      saveFile: null,
      currentDate: "",
      article: {},
      articleNo: this.$route.params.articleNo,
      comments: [],
      reply: null,
    };
  },
  computed: {
    ...mapState(["userId"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    http.get(`/board/list/${this.$route.params.articleNo}`).then(({ data }) => {
      this.article = data;
    });

    this.getRelpies();
  },
  mounted() {
    const today = new Date();
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    this.currentDate = year + month + day;
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleNo: this.article.articleNo },
      });
      //   this.$router.unshift({ path: `/board/modify/${this.article.articleNo}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleNo: this.article.articleNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    async createReply() {
      const p = {
        articleNo: this.$route.params.articleNo,
        userId: this.userId,
        content: this.reply,
      };

      await http.post(`/reply/list/${this.$route.params.articleNo}`, p);
      this.reply = "";
      this.getRelpies();
    },
    getRelpies() {
      this.comments = [];
      http.get(`/reply/list/${this.$route.params.articleNo}`).then(({ data }) => {
        data.forEach((comment) => {
          this.comments.push(comment);
        });
      });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
