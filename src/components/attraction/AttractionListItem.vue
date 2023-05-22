<template>
  <div>
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
    <button v-on:click="addAttraction" :class="{ 'red-button': isAdded, 'green-button': !isAdded }">
      {{ isAdded ? "삭제" : "등록" }}
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Cookies from "js-cookie";

export default {
  name: "AttractionListItem",
  data() {
    return {
      isColor: false,
      isAdded: false,
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
    addAttraction() {
      // TODO
      //  삭제 토글 처리 필요
      if (this.isAdded == false) {
        this.isAdded ^= true;
        console.log(this.attraction.contentId);
        let contentIdSet = new Set();
        let restoredSet = Cookies.get("plans");
        if (restoredSet) contentIdSet = new Set(JSON.parse(restoredSet));
        contentIdSet.add(this.attraction.contentId);
        console.log(contentIdSet);
        Cookies.set("plans", JSON.stringify(Array.from(contentIdSet)));
      } else {
        this.isAdded ^= true;
        let contentIdSet = new Set(JSON.parse(Cookies.get("plans")));
        contentIdSet.delete(this.attraction.contentId);
        console.log(contentIdSet);
        Cookies.set("plans", JSON.stringify(Array.from(contentIdSet)));
      }
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
.red-button {
  background-color: red;
}
.green-button {
  background-color: green;
}
</style>
