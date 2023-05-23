<template>
  <div>
    <b-table striped hover primary-key="id" :fields="fields" :items="items"></b-table>
    <button @click="submit">submit</button>
    <pre>{{ items }}</pre>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: "SortableJSBTable",
  mounted() {
    this.$nextTick(() => {
      const self = this;
      Sortable.create(document.querySelector(".b-table tbody"), {
        animation: 200,
        onEnd: (evt) => {
          const targetItem = self.items.splice(evt.oldIndex, 1)[0];
          self.items.splice(evt.newIndex, 0, targetItem);
        },
      });
    });
  },
  computed: {
    fields() {
      return [
        {
          key: "id",
          label: "id",
        },
        {
          key: "name",
          label: "飲料",
        },
      ];
    },
  },
  data() {
    return {
      draggableOptions: {
        animation: 400,
      },
      items: [
        {
          id: 1,
          name: "green tea",
        },
        {
          id: 2,
          name: "black tea",
        },
        {
          id: 3,
          name: "lemon tea",
        },
        {
          id: 4,
          name: "coffee",
        },
      ],
    };
  },
  methods: {
    submit() {
      const postData = this.items.map((item, idx) => ({
        id: item.id,
        name: item.name,
        order: idx,
      }));
      console.log(postData);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .b-table {
  tbody {
    tr {
      cursor: move;
    }
  }
}
</style>
