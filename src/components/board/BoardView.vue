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
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleNo}.
            ${article.subject} [${article.hit}]</h3><div><h6>${article.userId}</div><div>${article.registerTime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <!-- <b-button variant="outline-primary" @click="createReply">댓글 작성</b-button> -->
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
      <b-card style="height: 300px; overflow-y: scroll">
        <!-- <div v-for="comment in comments" :key="comment.replyId" class="d-flex"> -->
        <board-reply-item
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
        ></board-reply-item>
        <!-- <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div> -->
        <!-- <div class="ms-3">
            <div class="text-left">
              <b>{{ comment.userId }}</b>
            </div>
            {{ comment.content }}
            <hr />
          </div> -->
        <!-- </div> -->
      </b-card>
    </div>
  </b-container>
</template>

<script>
import http from "@/api/http";
import BoardReplyItem from "./item/BoardReplyItem.vue";

export default {
  components: { BoardReplyItem },
  name: "BoardDetail",
  data() {
    return {
      article: {},
      articleNo: this.$route.params.articleNo,
      comments: [],
      reply: null,
    };
  },
  computed: {
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
      this.$router.unshift({ name: "boardlist" });
    },
    createReply() {
      const p = {
        articleNo: this.$route.params.articleNo,
        userId: "z",
        content: this.reply,
      };

      http.post(`/reply/list/${this.$route.params.articleNo}`, p).then(({ data }) => {
        console.log(data);
        this.comments.unshift(p);
      });
      this.reply = null;
    },
    getRelpies() {
      http.get(`/reply/list/${this.$route.params.articleNo}`).then(({ data }) => {
        data.forEach((comment) => {
          this.comments.unshift(comment);
        });
      });

      console.log(this.comments);
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
