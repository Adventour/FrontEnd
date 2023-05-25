<template>
  <div>
    <b-navbar toggleable="lg" style="height: 5rem; background-color: lightcyan">
      <b-navbar-brand>
        <router-link
          :to="{ name: 'main' }"
          class="link"
          style="color: limegreen; font-size: 2rem; text-decoration: none"
        >
          <!-- <img src="@/assets/Adventour.png" style="height: 5rem" /> -->
          Adventour
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" right style="width: 400px">
            <b-row>
              <b-col cols="4">
                <span v-if="userId.length !== 0">
                  <router-link :to="{ name: 'trip' }" class="link">여행지검색</router-link>
                </span>
                <span v-else>
                  <router-link
                    :to="{ name: 'memberlogin', params: { msg: '로그인이 필요한 페이지입니다' } }"
                    class="link"
                    >여행지검색</router-link
                  >
                </span>
              </b-col>

              <b-col cols="4">
                <span v-if="userId.length !== 0">
                  <router-link :to="{ name: 'board' }" class="link"> 후기게시판 </router-link>
                </span>
                <span v-else>
                  <router-link
                    :to="{ name: 'memberlogin', params: { msg: '로그인이 필요한 페이지입니다' } }"
                    class="link"
                    >후기게시판</router-link
                  >
                </span>
              </b-col>
              <!-- <router-link :to="{ name: 'review' }" class="m-2 link"> 후기게시판 </router-link>
            <router-link :to="{ name: 'hotplace' }" class="m-2 link"> 핫플자랑하기 </router-link> -->
              <b-col cols="4">
                <span v-if="userId.length !== 0">
                  <router-link :to="{ name: 'planlist' }" class="link"> 나의여행계획 </router-link>
                </span>
                <span v-else>
                  <router-link
                    :to="{ name: 'memberlogin', params: { msg: '로그인이 필요한 페이지입니다' } }"
                    class="link"
                    >나의여행계획</router-link
                  >
                </span>
              </b-col>
            </b-row>
            <!-- <b-icon icon="calendar-check" animation="fade" font-scale="2"></b-icon> -->
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <span v-if="!this.isLogin">
              <router-link :to="{ name: 'memberjoin' }" class="link mr-3">
                <!-- <b-icon icon="person-circle"></b-icon>  -->
                회원가입
              </router-link>
              <router-link :to="{ name: 'memberlogin' }" class="link mr-3">
                <!-- <b-icon icon="key"></b-icon>  -->
                로그인
              </router-link>
            </span>
            <span v-if="this.isLogin">
              <span>{{ this.id }}님 안녕하세요</span>
              <router-link :to="{ name: 'memberprofile' }" class="link ml-3 mr-3">
                <!-- <b-icon icon="person-circle"></b-icon>  -->
                내정보
              </router-link>
              <span @click="logout">로그아웃</span>
            </span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "TheHeaderNavBar",
  data() {
    return {
      isLogin: false,
      accessToken: Cookies.get("accessToken"),
      id: "",
    };
  },
  created() {
    this.checkLogin();
  },
  computed: {
    ...mapState(["userId"]),
  },
  methods: {
    ...mapActions(["cleanUserId"]),
    checkLogin() {
      this.isLogin = !!Cookies.get("accessToken"); // !! 연산자를 사용하여 즉시 boolean 값으로 변환
      this.id = JSON.parse(atob(this.accessToken.split(".")[1])).sub;
    },
    async logout() {
      await Cookies.remove("accessToken");
      this.isLogin = false; // 로그아웃 후에 isLogin 변수를 갱신하여 로그인 상태 변경
      await this.cleanUserId();
      this.$router.push({ name: "main" });
    },
    alertLogin() {
      console.log(1111);
      alert("로그인이 필요한 페이지입니다!");
      this.$router.push({ name: "memberlogin" });
    },
  },
};
</script>

<style scoped>
#nav-collapse * {
  color: aliceblue;
}
.navbar-nav .nav-link {
  font-size: 1.2rem; /* 원하는 글씨 크기로 변경 */
}

#nav-collapse * {
  color: limegreen; /* 변경할 글씨 색상 설정 */
}
</style>
