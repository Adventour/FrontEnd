<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <!-- <b-form-group
          id="userId-group"
          label="작성자:"
          label-for="userId"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userId"
            :disabled="isUserid"
            v-model="article.userId"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group> -->

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <board-input-selection @contentId="getContentId"></board-input-selection>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>
        <file-input-item @file-selected="handleFileSelected"></file-input-item>
        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/api/http";
import FileInputItem from "./FileInputItem.vue";
import BoardInputSelection from "./BoardInputSelection.vue";
// import axios from "axios";  //인가 처리를 위해 import
// import Cookies from "js-cookie";

export default {
  components: { FileInputItem, BoardInputSelection },
  name: "BoardInputItem",
  data() {
    return {
      contentId: null,
      article: {
        articleNo: 0,
        userId: "",
        subject: "",
        content: "",
      },
      isUserid: false,
      selectedFile: new File([], "empty.txt", { type: "text/plain" }),
    };
  },
  props: {
    type: { type: String },
  },

  // computed: {
  //   ...mapState(["attractions"]),
  // },
  created() {
    if (this.type === "modify") {
      http.get(`/board/list/${this.$route.params.articleNo}`).then(({ data }) => {
        // this.article.articleNo = data.article.articleNo;
        // this.article.userId = data.article.userId;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.article = data;
      });
      this.isUserid = true;
    }
  },
  methods: {
    handleFileSelected(file) {
      this.selectedFile = file;
      console.log("파일 선택했어요");
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(this.contentId);
      let err = true;
      let msg = "";
      !this.article.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleNo = 0;
      this.article.subject = "";
      this.article.content = "";
    },
    registArticle() {
      const formData = new FormData();
      formData.append("upfile", this.selectedFile);
      formData.append("subject", this.article.subject);
      formData.append("content", this.article.content);
      formData.append("contentId", this.contentId);
      // formData.append("articleNo", this.article.articleNo);

      // 인가처리 axios
      // axios
      //   .post("http://localhost/board/write", formData, {
      //     headers: {
      //       Authorization: `Bearer ${Cookies.get("accessToken")}`,
      //       "Content-Type": "multipart/form-data", // 멀티파트 형식으로 설정
      //     },
      //   })
      //   .then(({ status }) => {
      //     let msg = "등록 처리시 문제가 발생했습니다.";
      //     if (status === 200) {
      //       msg = "등록이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     this.moveList();
      //   });

      http
        .post(`/board/write`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 멀티파트 형식으로 설정
          },
        })
        .then(({ status }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (status === 200) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      const formData = new FormData();
      formData.append("upfile", this.selectedFile);
      formData.append("subject", this.article.subject);
      formData.append("content", this.article.content);
      formData.append("contentId", this.contentId);

      http
        .post(`/board/list/${this.article.articleNo}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 멀티파트 형식으로 설정
          },
        })
        .then(({ status }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (status === 200) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        });
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    getContentId(data) {
      this.contentId = data;
    },
  },
};
</script>

<style></style>
