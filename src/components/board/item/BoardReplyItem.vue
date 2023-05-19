<template>
  <!-- <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div> -->
  <div class="ms-3">
    <div class="text-left">
      <b>{{ comment.userId }}</b>
    </div>
    {{ comment.content }}
    <hr />
  </div>
</template>

<script>
export default {
  name: "BoardReplyItem",
  data() {
    return {
      //   comments: [],
      //   comment: null,
    };
  },
  props: {
    comment: Object,
  },
  created() {
    // const p = {
    //   articleNo: this.$route.params.articleNo,
    //   userId: "z",
    //   content: this.reply,
    // };
    // http.post(`/reply/list/${this.$route.params.articleNo}`, p).then(({ data }) => {
    //   this.comments.push(data);
    // });
    // this.reply = null;
  },
  methods: {},
};
</script>

<style scoped></style>
