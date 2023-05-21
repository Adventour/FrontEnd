<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">EnjoyTrip</b-navbar-brand>

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
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'memberjoin' }" class="link">
                <b-icon icon="person-circle"></b-icon> 회원가입
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'memberlogin' }" class="link">
                <b-icon icon="key"></b-icon> 로그인
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TheHeaderNavBar",
  data() {
    return {};
  },
};
</script>

<style scoped>
#nav-collapse * {
  color: aliceblue;
}
</style>
