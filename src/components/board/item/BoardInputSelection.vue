<template>
  <b-form-group id="attraction-group" label="관광지명:" label-for="attraction">
    <b-row class="mt-4 mb-4 text-center">
      <b-col class="sm-3" cols="2">
        <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
      </b-col>
      <b-col class="sm-3" cols="2">
        <b-form-select v-model="gugunCode" :options="guguns"></b-form-select>
      </b-col>
      <b-col class="sm-3" cols="3">
        <b-form-select v-model="contentTypeId" :options="types"></b-form-select>
      </b-col>
      <b-col class="sm-3" cols="3">
        <b-form-input v-model="title" placeholder="관광지명 검색"></b-form-input>
      </b-col>
      <b-col class="sm-3" cols="2">
        <b-button variant="success" @click="searchTitles">검색</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-form-select
        v-model="contentId"
        :options="attractions"
        @change="sendContentId"
      ></b-form-select>
    </b-row>
  </b-form-group>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import http from "@/api/http";

export default {
  name: "BoardInputSelection",
  components: {},
  data() {
    return {
      contentId: null,
      attractions: [{ value: null, text: "관광지 선택" }],
      sidoCode: null,
      gugunCode: null,
      contentTypeId: null,
      title: null,
      sidos: [
        { value: null, text: "시/도" },
        { value: 1, text: "서울" },
        { value: 2, text: "인천" },
        { value: 3, text: "대전" },
        { value: 4, text: "대구" },
        { value: 5, text: "광주" },
        { value: 6, text: "부산" },
        { value: 7, text: "울산" },
        { value: 8, text: "세종특별자치시" },
        { value: 31, text: "경기도" },
        { value: 32, text: "강원도" },
        { value: 33, text: "충청북도" },
        { value: 34, text: "충청남도" },
        { value: 35, text: "경상북도" },
        { value: 36, text: "경상남도" },
        { value: 37, text: "전라북도" },
        { value: 38, text: "전라남도" },
        { value: 39, text: "제주도" },
      ],
      types: [
        { value: null, text: "관광지 유형" },
        { value: "12", text: "관광지" },
        { value: "14", text: "문화시설" },
        { value: "15", text: "행사/공연/축제" },
        { value: "25", text: "여행코스" },
        { value: "28", text: "레포츠" },
        { value: "32", text: "숙박" },
        { value: "38", text: "쇼핑" },
        { value: "39", text: "음식점" },
      ],
    };
  },
  computed: {
    ...mapState(["guguns"]),
  },
  created() {
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_ATTRACTION_LIST();
  },
  methods: {
    ...mapActions(["getGugun", "getAttractionList"]),
    ...mapMutations(["CLEAR_GUGUN_LIST", "CLEAR_ATTRACTION_LIST"]),
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchTitles() {
      this.attractions = [];
      if (this.title == null || this.title.length == 0) this.title = null;

      const params = {
        sidoCode: this.sidoCode,
        gugunCode: this.gugunCode,
        contentTypeId: this.contentTypeId,
        title: this.title,
      };
      //   console.log(params);
      if (this.title || this.sidoCode) {
        http.get("/attraction/search", { params }).then(({ data }) => {
          console.log(data);
          data.forEach((attraction) => {
            this.attractions.push({ value: attraction.contentId, text: attraction.title });
          });
        });
      } else alert("검색어 혹은 시/도를 선택해주세요!");
    },
    sendContentId() {
      //   console.log("자식에서 콘텐트아이디", this.contentId);
      this.$emit("contentId", this.contentId);
    },
  },
};
</script>

<style scoped></style>
