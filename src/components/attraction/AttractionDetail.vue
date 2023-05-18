<template>
  <b-container v-if="attraction" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ attraction.title }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col><b-img :src="attraction.image" fluid-grow></b-img></b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>상세 정보</h2>
        <b-alert show variant="secondary">{{ overview }}</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TripDetail",
  computed: {
    ...mapState(["attraction", "overview"]),
    // attraction() {
    //   return this.$store.state.attraction;
    // },
  },
};
</script>

<style></style>
