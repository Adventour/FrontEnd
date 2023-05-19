<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {},
  data() {
    return {
      map: null,
      positions: [],
      markers: [],
      overlays: [],
    };
  },
  // props로 attractions 가져와야 함
  props: {
    attractions: [],
    attraction: Object,
  },
  // watch로 attractions가 바뀔때마다 실행하도록 함
  watch: {
    attraction() {
      var content = `<div class="customoverlay">
          <a href="https://map.kakao.com/link/map/11394059" target="_blank">
            <span class="title">
              후기 보기
            </span>
          </a>
        </div>`;
      // console.log(this.attraction);
      if (this.overlays != null) {
        for (let i = 0; i < this.overlays.length; i++) {
          this.overlays[i].setMap(null);
        }
      }

      if (this.attraction != null) {
        const center = new kakao.maps.LatLng(this.attraction.latitude, this.attraction.longitude);
        this.changeMarker(this.attraction.latitude, this.attraction.longitude, content);
        this.map.setCenter(center);
        this.map.setLevel(4);
      }
    },
    attractions() {
      // console.log("관광지 개수: ", this.attractions.length);
      this.deleteMarkers();
      this.positions = [];
      this.attractions.forEach((attraction) => {
        let obj = {};
        obj.title = attraction.title;
        obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
        this.positions.push(obj);
      });
      // console.log("마커 개수: ", this.positions.length);
      this.loadMaker();
    },
  },

  mounted() {
    if (window.kakao && window.kakao.map) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    // kakao api를 script로 load
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&autoload=false";
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    // 맵 출력
    loadMap() {
      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };
      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
    loadMaker() {
      this.markers = [];
      this.positions.forEach((position) => {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: position.latlng, // 마커를 표시할 위치
          title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          // image: markerImage, // 마커 이미지
        });
        this.markers.push(marker);
      });
      // 4. 지도를 이동시켜주기
      // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      const bounds = this.positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );
      this.map.setBounds(bounds);
    },

    deleteMarkers() {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
    },

    changeMarker(lat, lng, content) {
      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(lat, lng);

      // 커스텀 오버레이를 생성합니다
      this.overlays.push(
        new kakao.maps.CustomOverlay({
          map: this.map,
          position: position,
          content: content,
          yAnchor: 1,
        })
      );
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
  border: 3px solid;
}
div {
  border: 3px solid;
}
</style>
