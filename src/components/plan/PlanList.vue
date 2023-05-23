<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>플랜 이름</th>
            <th>플랜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in plans" :key="item.planName">
            <td rowspan="2">{{ item.planName }}</td>

            <td v-for="pd in item.attractionImages" :key="pd">
              <img v-if="pd" :src="pd" class="fixed-size-img" alt="" />
              <img
                v-else
                src="https://github-production-user-asset-6210df.s3.amazonaws.com/76719828/239785774-5f7758df-bd48-44a8-905d-7ec8ceab98ec.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230522%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230522T022705Z&X-Amz-Expires=300&X-Amz-Signature=cc62cd3971d90d1fd58715c5070f0c6f771f6fe663f52ee99300b5f4887921ab&X-Amz-SignedHeaders=host&actor_id=76719828&key_id=0&repo_id=641175478"
                class="fixed-size-img"
                alt=""
              />
            </td>
          </tr>

          <tr v-for="item in plans" :key="item.planName">
            <td v-for="pd in item.attractionTitles" :key="pd">{{ pd }}</td>
          </tr>
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
        { key: "planName", label: "플랜 이름" },
        { key: "attractionTitles", label: "관광지 이름" },
        { key: "attractionImages", label: "관광지 사진" },
      ],
    };
  },
  async created() {
    await axios
      .get("http://localhost/plan/search", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.plans = response.data;
      });
  },
};
</script>

<style>
.fixed-size-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
}
</style>
