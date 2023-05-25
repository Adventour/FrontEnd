<template>
  <div>
    <div>
      <table>
        <!-- <thead>
          <th>플랜 이름</th>
          <th>플랜</th>
        </thead> -->
        <tbody>
          <div v-for="item in plans" :key="item.planId">
            <tr>
              <td class="plan-name">{{ item.planName }}</td>
              <td class="plans" v-for="pd in item.attractionImages" :key="pd">
                <img v-if="pd" :src="pd" class="fixed-size-img" alt="" />
                <img
                  v-else
                  src="https://github-production-user-asset-6210df.s3.amazonaws.com/76719828/239785774-5f7758df-bd48-44a8-905d-7ec8ceab98ec.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230522%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230522T022705Z&X-Amz-Expires=300&X-Amz-Signature=cc62cd3971d90d1fd58715c5070f0c6f771f6fe663f52ee99300b5f4887921ab&X-Amz-SignedHeaders=host&actor_id=76719828&key_id=0&repo_id=641175478"
                  class="fixed-size-img"
                  alt=""
                />
              </td>
            </tr>
            <tr>
              <td>
                <b-button @click="modify(item)" style="background-color: greenyellow"
                  >수정</b-button
                >
                <b-button @click="remove(item.planId)" style="background-color: red">삭제</b-button>
              </td>
              <td class="plans" v-for="pd in item.attractionTitles" :key="pd">{{ pd }}</td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "PlanList",
  data() {
    return {
      plans: [],
      fields: [
        { key: "planId", label: "플랜 아이디" },
        { key: "planName", label: "플랜 이름" },
        { key: "attractionTitles", label: "관광지 이름" },
        { key: "attractionImages", label: "관광지 사진" },
      ],
    };
  },
  async created() {
    await axios
      .get("http://adventour.site:8080/plan/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((response) => {
        this.plans = response.data;
        console.log(this.plans);
        this.$route.push({ name: "planlist" });
      });
  },
  methods: {
    modify(item) {
      this.$router.push({ name: "planmodify", params: { item: item } });
    },

    remove(planId) {
      axios
        .delete("http://adventour.site:8080/plan/details/" + planId, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        })
        .then(location.reload());
    },
  },
};
</script>

<style>
.fixed-size-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50px;
}
.plans {
  width: 100px;
  padding-left: 15px;
  padding-top: 15px;
}
.plan-name {
  width: 200px;
}
</style>
