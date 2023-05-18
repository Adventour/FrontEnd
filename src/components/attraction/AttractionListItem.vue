<template>
  <b-row
    class="m-2"
    @click="selectAttraction"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col cols="2" class="text-center align-self-center">
      <b-img thumbnail :src="attraction.image" alt="Image 1"></b-img>
    </b-col>
    <b-col cols="10" class="align-self-center">
      [{{ attraction.title }}] {{ attraction.addr }}
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AttractionListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    attraction: Object,
  },
  methods: {
    ...mapActions(["detailAttraction"]),
    selectAttraction() {
      // console.log("listRow : ", this.attraction);
      // this.$store.dispatch("getAttraction", this.attraction);
      this.detailAttraction(this.attraction);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
