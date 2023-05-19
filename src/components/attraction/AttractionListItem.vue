<template>
  <b-row
    class="m-2"
    @click="selectAttraction"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <div>
      <b-card
        no-body
        style="width: 20rem"
        :img-src="attraction.image"
        img-alt="없음"
        img-top
        img-height="150px"
      >
        <template #header>
          <div>
            <h4 class="mb-0">{{ attraction.title }}</h4>
            <!-- <button>등록</button> -->
          </div>
        </template>

        <b-card-body>
          <b-card-text>
            {{ attraction.addr }}
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
    <!-- <b-card no-body class="overflow-hidden" style="height: 100px">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="attraction.image" alt="없음" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="attraction.title">
            <b-card-text>
              <hr />
              {{ attraction.addr }}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card> -->
    <!-- <b-card
      :img-src="attraction.image"
      img-alt="Card image"
      img-left
      img-width="100px"
      class="mb-3"
    >
      <b-card-text> [{{ attraction.title }}] {{ attraction.addr }}] </b-card-text>
    </b-card> -->
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
