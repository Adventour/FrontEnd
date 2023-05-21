<template>
  <div>fuck1
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
                      <td>{{item.planName}}</td>
                      <!-- <td>{{plans}}</td> -->
                      <td v-for="pd in item" :key="pd.planDetail">{{pd}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
    name: "PlanList",
  data() {
    return {
        plans: [],
        fields: [
            {key:"planName", label:"플랜 이름"},
            {key:"planDetail", label:"플랜 디테일"},
        ],
        }
  },
  created() {
    http.post(`/plan/search`, {
        // TODO
        //  accessToken 전송 필요 
        userId: "z",
    }).then(({ data }) => {
        console.log(data);
      this.plans = data;
    });
  },
}

</script>

<style>

</style>