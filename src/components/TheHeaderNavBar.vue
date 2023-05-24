<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand>
        <router-link :to="{ name: 'main' }" class="link" type="dark">EnjoyTrip</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" right>
            <router-link :to="{ name: 'main' }" class="link"> 여행지검색 </router-link>
            <router-link :to="{ name: 'board' }" class="link"> 자유게시판 </router-link>
            <!-- <router-link :to="{ name: 'review' }" class="m-2 link"> 후기게시판 </router-link>
            <router-link :to="{ name: 'hotplace' }" class="m-2 link"> 핫플자랑하기 </router-link> -->
            <router-link :to="{ name: 'planlist' }" class="link"> 나의여행계획 </router-link>
            <!-- <b-icon icon="calendar-check" animation="fade" font-scale="2"></b-icon> -->
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <span v-if="!this.isLogin">
              <router-link :to="{ name: 'memberjoin' }" class="link">
                <!-- <b-icon icon="person-circle"></b-icon>  -->
                회원가입
              </router-link>
              <router-link :to="{ name: 'memberlogin' }" class="link">
                <!-- <b-icon icon="key"></b-icon>  -->
                로그인
              </router-link>
            </span>
            <span v-if="this.isLogin">
              <span>{{ this.id }}님 안녕하세요</span>
              <router-link :to="{ name: 'memberprofile' }" class="link">
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
  watch: {},
  methods: {
    checkLogin() {
      this.isLogin = !!Cookies.get("accessToken"); // !! 연산자를 사용하여 즉시 boolean 값으로 변환
      this.id = JSON.parse(atob(this.accessToken.split(".")[1])).sub;
    },
    async logout() {
      await Cookies.remove("accessToken");
      this.isLogin = false; // 로그아웃 후에 isLogin 변수를 갱신하여 로그인 상태 변경
      // this.$router.push({ name: "main" });
      location.reload();
    },
  },
};
</script>

<style scoped>
#nav-collapse * {
  color: aliceblue;
}
</style>
