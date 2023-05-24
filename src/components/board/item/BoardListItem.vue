<template>
  <div>
    <b-tr>
      <b-td>{{ this.article.articleNo }}</b-td>
      <!-- <b-th class="text-left">
      <router-link :to="{ name: 'boardview', params: { articleno: articleno } }">{{
        subject
      }}</router-link>
    </b-th>
    <b-td>{{ image }}</b-td>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ regtime | dateFormat }}</b-td> -->
    </b-tr>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
    article: Object,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
  created() {
    console.log(1);
  },
};
</script>

<style></style>
