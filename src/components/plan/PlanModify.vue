<template>
  <div>
    <h3 class="plan-detail-name">계획 이름 : {{ planDetails.planName }}</h3>
    <div ref="sortableContainer">
      <tr v-for="(image, index) in planDetails.attractionImages" :key="image">
        <td>
          <div>
            <img v-if="image" :src="image" class="fixed-size-img-dt" alt="" />
            <img
              v-else
              src="https://github-production-user-asset-6210df.s3.amazonaws.com/76719828/239785774-5f7758df-bd48-44a8-905d-7ec8ceab98ec.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230522%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230522T022705Z&X-Amz-Expires=300&X-Amz-Signature=cc62cd3971d90d1fd58715c5070f0c6f771f6fe663f52ee99300b5f4887921ab&X-Amz-SignedHeaders=host&actor_id=76719828&key_id=0&repo_id=641175478"
              class="fixed-size-img-dt"
              alt=""
            />
          </div>
        </td>
        <td class="plan-detail-att">
          <div>
            {{ planDetails.attractionTitles[index] }}
          </div>
        </td>
        <td class="plan-detail-descript">
          <div class="test">
            {{ planDetails.descripts[index] }}
          </div>
        </td>
      </tr>
      <!-- <span v-for="title in planDetails.attractionTitles" :key="title">
        {{ title }}
      </span> -->
    </div>
    <button @click="modify">수정</button>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "PlanModify",
  data() {
    return {
      planDetails: [],
      sortable: null,
    };
  },
  created() {
    this.planDetails = this.$route.params.item;
    console.log(this.planDetails);
  },
  mounted() {
    this.sortable = Sortable.create(this.$refs.sortableContainer, {
      animation: 150,
      onEnd: this.handleSort,
    });
  },
  methods: {
    handleSort(event) {
      const { oldIndex, newIndex } = event;
      const movedImage = this.planDetails.attractionImages.splice(oldIndex, 1)[0];
      const movedTitle = this.planDetails.attractionTitles.splice(oldIndex, 1)[0];
      const movedId = this.planDetails.contentIds.splice(oldIndex, 1)[0];
      const movedDescript = this.planDetails.descripts.splice(oldIndex, 1)[0];
      this.planDetails.attractionImages.splice(newIndex, 0, movedImage);
      this.planDetails.attractionTitles.splice(newIndex, 0, movedTitle);
      this.planDetails.contentIds.splice(newIndex, 0, movedId);
      this.planDetails.descripts.splice(newIndex, 0, movedDescript);
      console.log(this.planDetails);
    },
    modify() {
      console.log(this.planDetails.contentIds);
      axios
        .put(
          "http://adventour.site:8080/plan/details",
          {
            contentIds: this.planDetails.contentIds,
            planId: this.$route.params.item.planId,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        )
        .then(
          this.$router.push({ name: "planlist" }).then(() => {
            location.reload();
          })
        );
    },
  },
};
</script>

<style>
.fixed-size-img-dt {
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin-left: 30px;
  margin-bottom: 15px;
  border-radius: 50px;
}
.plan-detail-name {
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 30px;
}
.plan-detail-att {
  font-size: 30px;
  margin-left: 40px;
  width: 300px;
}
.plan-detail-descript {
  margin-right: 100px;
  vertical-align: middle;
  text-align: left;
  overflow: auto;
}
</style>
