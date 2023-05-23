<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
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
    <b-button variant="success" @click="searchAttraction">검색</b-button>
    <b-button @click="addPlans">계획 추가</b-button>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "AttractionSearchBar",
  data() {
    return {
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
    ...mapState(["guguns", "attractions"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    // this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_ATTRACTION_LIST();
    // this.getSido();
  },
  methods: {
    ...mapActions(["getGugun", "getAttractionList"]),
    ...mapMutations(["CLEAR_GUGUN_LIST", "CLEAR_ATTRACTION_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },

    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchAttraction() {
      if (this.title == null || this.title.length == 0) this.title = null;

      const codes = [this.sidoCode, this.gugunCode, this.contentTypeId, this.title];
      // console.log(codes);
      if (this.gugunCode || (this.sidoCode && this.title)) this.getAttractionList(codes);
      else alert("시/도를 선택해주세요!");
    },
    addPlans() {
      // TODO
      //  planName 입력하는 창 추가
      var restoredSet = Cookies.get("plans");
      if (restoredSet) {
        var contentIdList = JSON.parse(restoredSet);
        console.log(contentIdList);
        axios
          .post("http://localhost/plan/add", contentIdList, {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          })
          .then((response) => {
            console.log(response);
            Cookies.remove("plans");
          });
      } else {
        // TODO
        //  예외 처리
        alert("저장된 관광지가 없습니다");
      }
    },
  },
};
</script>

<style></style>
