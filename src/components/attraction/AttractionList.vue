<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col cols="3" align="left">
        <attraction-list-item
          v-for="(attraction, index) in attractions"
          :key="index"
          :attraction="attraction"
        />
      </b-col>
      <b-col cols="9">
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

<style></style>
