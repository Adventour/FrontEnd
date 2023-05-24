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
          <b-carousel-slide
            caption="First slide"
            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
            img-src="https://picsum.photos/1024/480/?image=52"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
            <h1>Hello world!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block"
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
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
