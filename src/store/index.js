import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "구/군" }],
    attractions: [],
    attraction: null,
    overview: null,
    userId: "",
    todos: [
      // { title: '할 일1', completed: false },
      // { title: '할 일2', completed: false },
    ],
  },
  getters: {
    allTodosCount(state) {
      return state.todos.length;
    },
    completedTodosCount(state) {
      return state.todos.filter((todo) => {
        return todo.completed === true;
      }).length;
    },
    unCompletedTodosCount(state) {
      return state.todos.filter((todo) => {
        return todo.completed === false;
      }).length;
    },
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    /////////////////////////////// Attraction start /////////////////////////////////////
    // SET_SIDO_LIST(state, sidos) {
    //   sidos.forEach((sido) => {
    //     state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
    //   });
    // },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.name });
      });
    },
    // CLEAR_SIDO_LIST(state) {
    //   state.sidos = [{ value: null, text: "선택하세요" }];
    // },
    CLEAR_ATTRACTION_LIST(state) {
      state.attractions = [];
      state.attraction = null;
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구/군" }];
    },
    SET_ATTRACTION_LIST(state, attractions) {
      state.attractions = attractions;
    },
    SET_DETAIL_ATTRACTION(state, attraction) {
      // console.log("Mutations", attraction);
      state.attraction = attraction;
    },
    SET_DETAIL_OVERVIEW(state, overview) {
      // console.log("Mutations", attraction);
      state.overview = overview;
    },
    /////////////////////////////// Attraction end /////////////////////////////////////

    //////////////////////////// Todo List start //////////////////////////////////
    CREATE_TODO(state, todoItem) {
      state.todos.push(todoItem);
    },
    UPDATE_TODO_STATUS(state, todoItem) {
      state.todos = state.todos.map((todo) => {
        if (todo === todoItem) {
          return {
            ...todo,
            completed: !todoItem.completed,
          };
        }
        return todo;
      });
    },
    DELETE_TODO_ITEM(state, todoItem) {
      const idx = state.todos.indexOf(todoItem);
      state.todos.splice(idx, 1);
    },
    //////////////////////////// Todo List end //////////////////////////////////
  },
  actions: {
    setUserId({ commit }, userId) {
      commit("SET_USER_ID", userId);
    },
    /////////////////////////////// Attraction start /////////////////////////////////////
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      http
        .get(`/attraction/gugun`, { params })
        .then(({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAttractionList({ commit }, codes) {
      const params = {
        sidoCode: codes[0],
        gugunCode: codes[1],
        contentTypeId: codes[2],
        title: codes[3],
      };

      http
        .get("/attraction/search", { params })
        .then(({ data }) => {
          commit("CLEAR_ATTRACTION_LIST");
          commit("SET_ATTRACTION_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detailAttraction({ commit }, attraction) {
      // 나중에 attraction.일련번호를 이용하여 API 호출
      // console.log(commit, attraction);
      http
        .get("/attraction/overview", {
          params: {
            contentId: attraction.contentId,
          },
        })
        .then(({ data }) => {
          commit("SET_DETAIL_OVERVIEW", data);
          commit("SET_DETAIL_ATTRACTION", attraction);
        });
    },
    /////////////////////////////// Attraction end /////////////////////////////////////

    //////////////////////////// Todo List start //////////////////////////////////
    createTodo({ commit }, todoItem) {
      // console.log(commit);
      // console.log(todoItem);
      commit("CREATE_TODO", todoItem);
    },
    updateTodoStatus({ commit }, todoItem) {
      commit("UPDATE_TODO_STATUS", todoItem);
    },
    deleteTodoItem({ commit }, todoItem) {
      commit("DELETE_TODO_ITEM", todoItem);
    },
    //////////////////////////// Todo List end //////////////////////////////////
  },
  modules: {},
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
