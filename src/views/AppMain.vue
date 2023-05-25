<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col cols="8" align="left">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="10000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide :img-src="require('@/assets/게시판 댓글.png')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('@/assets/여행지 검색.png')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('@/assets/여행지 등록.png')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('@/assets/여행지 목록.png')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('@/assets/여행지 세부정보.png')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('@/assets/회원가입.png')"></b-carousel-slide>
          <b-carousel-slide :img-src="require('@/assets/후기 게시판.png')"></b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col cols="4">
        <the-hot-place></the-hot-place>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TheHotPlace from "@/components/TheHotPlace.vue";

export default {
  components: { TheHotPlace },
  name: "AppMain",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style>
#carousel-1 img {
  width: 500px;
  height: 800px;
}
</style>
