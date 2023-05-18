<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-orange">여행지 정보</h3>
    <attraction-search-bar></attraction-search-bar>
    <!-- <b-col cols="6" align="left"> -->
    <attraction-list></attraction-list>
    <attraction-detail></attraction-detail>
  </b-container>
</template>

<script>
import AttractionSearchBar from "@/components/attraction/AttractionSearchBar.vue";
import AttractionList from "@/components/attraction/AttractionList.vue";
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";
export default {
  name: "AppMain",
  components: {
    AttractionSearchBar,
    AttractionList,
    AttractionDetail,
  },
};
</script>

<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 149, 27, 0.3) 30%);
}
</style>
