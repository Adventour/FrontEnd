<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col cols="4" align="left" style="border: 3px solid; overflow: scroll; height: 700px">
        <attraction-list-item
          v-for="(attraction, index) in attractions"
          :key="index"
          :attraction="attraction"
        />
      </b-col>
      <b-col cols="8">
        <the-kakao-map :attractions="attractions" :attraction="attraction"></the-kakao-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AttractionListItem from "@/components/attraction/AttractionListItem";
import { mapState } from "vuex";
import TheKakaoMap from "../TheKakaoMap.vue";

export default {
  name: "AttractionList",
  components: {
    AttractionListItem,
    TheKakaoMap,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["attractions", "attraction"]),
    // attractions() {
    //   return this.$store.state.attractions;
    // },
  },
};
</script>

<style>
.customoverlay {
  position: relative;
  bottom: 55px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
}
.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  /* background: #d95050; */
  background: royalblue
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right
    14px center;
}
.customoverlay .title {
  display: block;
  text-align: center;
  background: #fff;
  margin-right: 35px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
}
.customoverlay:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  /* bottom: -12px; */
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
</style>
