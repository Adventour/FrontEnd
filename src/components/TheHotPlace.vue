<template>
  <div class="container">
    <div>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text> </b-card-text>
      </b-card>
    </div>
    <div>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text> </b-card-text>
      </b-card>
    </div>
    <div>
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text> </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHotPlace",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container img {
  margin: 5px; /* 이미지 사이의 간격 조정을 위한 여백 설정 */
  /* width: 100px;
  height: 100px; */
}
.mb-2 {
  height: 16.4rem;
}
</style>
