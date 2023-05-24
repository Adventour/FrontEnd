<template>
  <div>
    <b-row
      class="m-2"
      @click="
        selectAttraction();
        updateHit();
      "
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
            <b-row>
              <b-col cols="8" align="left">
                <div>
                  <h4 class="mb-0">{{ attraction.title }}</h4>
                </div>
              </b-col>
              <b-col clos="4">
                <b-button
                  v-on:click="addAttraction"
                  :class="{ 'red-button': isAdded, 'green-button': !isAdded }"
                >
                  {{ isAdded ? "삭제" : "등록" }}
                </b-button>
              </b-col>
            </b-row>
          </template>

          <b-card-body>
            <b-card-text>
              {{ attraction.addr }}
            </b-card-text>
          </b-card-body>
        </b-card>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Cookies from "js-cookie";
import http from "@/api/http";

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
      this.detailAttraction(this.attraction);
    },
    updateHit() {
      http.put(`/attraction/hit/${this.attraction.contentId}`).then(() => {
        console.log(this.attraction.title + ",,,," + this.attraction.hit);
      });
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
  border: none;
  background-color: tomato;
}
.green-button {
  border: none;
  background-color: mediumseagreen;
}
</style>
