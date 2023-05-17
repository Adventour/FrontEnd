<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-orange">여행지 정보</h3>
    <b-row>
      <b-col>
        <trip-search-bar></trip-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" align="left">
        <trip-list></trip-list>
      </b-col>
      <b-col cols="6">
        <trip-detail></trip-detail>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TripSearchBar from "@/components/trip/TripSearchBar.vue";
import TripList from "@/components/trip/TripList.vue";
import TripDetail from "@/components/trip/TripDetail.vue";
export default {
  name: "AppMain",
  components: {
    TripSearchBar,
    TripList,
    TripDetail,
  },
};
</script>

<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 149, 27, 0.3) 30%);
}
</style>
