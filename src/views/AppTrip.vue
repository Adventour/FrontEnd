<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-orange">여행지 정보</h3>
    <attraction-search-bar></attraction-search-bar>
    <attraction-list></attraction-list>
  </b-container>
</template>

<script>
import AttractionSearchBar from "@/components/attraction/AttractionSearchBar.vue";
import AttractionList from "@/components/attraction/AttractionList.vue";

export default {
  name: "AppTrip",
  components: {
    AttractionSearchBar,
    AttractionList,
  },
};
</script>

<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 149, 27, 0.3) 30%);
}
</style>
