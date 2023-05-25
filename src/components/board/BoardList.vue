<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        striped
        hover
        :items="articles"
        :fields="fields"
        @row-clicked="viewArticle"
        style="table-layout: fixed; font-size: 1.2rem"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(saveFile)="data">
          <img
            :src="data.value"
            alt="Image"
            class="img-thumbnail"
            style="height: 5rem; width: 10rem"
          />
        </template>

        <template #cell(subject)="data">
          <router-link :to="{ name: 'boardview', params: { articleNo: data.item.articleNo } }">
            {{ data.item.subject }}
          </router-link>
        </template>
      </b-table>
    </b-row>
    <!-- 페이지네이션 -->
    <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    ></b-pagination>
  </b-container>
</template>

<script>
import http from "@/api/http";
// import BoardListItem from "./item/BoardListItem.vue";

export default {
  name: "BoardList",
  components: {},
  data() {
    return {
      articles: [],
      fields: [
        // { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "saveFile", label: "사진", image: "tdClass" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      currentPage: 1,
      perPage: 7, // 페이지당 보여줄 아이템 수
    };
  },
  computed: {
    rows() {
      return this.articles.length;
    },
  },

  created() {
    http.get(`/board/`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleNo: article.articleNo },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: center;
}
</style>
