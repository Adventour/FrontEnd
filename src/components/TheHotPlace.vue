<template>
  <div class="container">
    <div>
      <b-card
        :title="attractions[0].title"
        :img-src="attractions[0].image"
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
        :title="attractions[1].title"
        :img-src="attractions[1].image"
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
        :title="attractions[2].title"
        :img-src="attractions[2].image"
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
import http from "@/api/http";
export default {
  name: "TheHotPlace",
  components: {},
  data() {
    return {
      attractions: [
        { title: "", image: null },
        { title: "", image: null },
        { title: "", image: null },
      ],
    };
  },
  async created() {
    await http.get(`/attraction/hit`).then(({ data }) => {
      this.attractions = data;
    });
    console.log(this.attractions[0].image);
  },
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
  width: 300px;
  height: 200px;
}
.mb-2 {
  height: 16.4rem;
}
</style>
