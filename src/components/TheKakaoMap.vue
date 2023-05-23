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
      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        this.attraction.title +
        // '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="' +
        this.attraction.image +
        '" width="73" height="70">' +
        "           </div>" +
        '            <div class="desc">' +
        '                <div class="ellipsis">' +
        this.attraction.addr +
        "</div>" +
        '                <div><a href="http://localhost:8080/board/list/' +
        this.attraction.contentId +
        '" class="link"><b>후기로 이동</a></div>' +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";
      // var content = `<div class="customoverlay">
      //     <a href="http://localhost:8080/board/list/${this.attraction.contentId}" onclick="">
      //       <span class="title">
      //         후기 보기
      //       </span>
      //     </a>
      //   </div>`;
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
      this.deleteMarkers();
      this.positions = [];
      this.attractions.forEach((attraction) => {
        let obj = {};
        obj.title = attraction.title;
        obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
        this.positions.push(obj);
        this.loadMaker(attraction);
      });

      // 4. 지도를 이동시켜주기
      // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      const bounds = this.positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );
      this.map.setBounds(bounds);
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

    loadMaker(attraction) {
      this.markers = [];
      const lat = attraction.latitude;
      const lng = attraction.longitude;
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(lat, lng), // 마커를 표시할 위치
        title: attraction.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        // image: markerImage, // 마커 이미지
      });

      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        attraction.title +
        // '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="' +
        attraction.image +
        '" width="73" height="70">' +
        "           </div>" +
        '            <div class="desc">' +
        '                <div class="ellipsis">' +
        attraction.addr +
        "</div>" +
        '                <div><a href="http://localhost:8080/board/list/' +
        attraction.contentId +
        '" class="link"><b>후기로 이동</a></div>' +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

      const handleClick = () => {
        for (let i = 0; i < this.overlays.length; i++) {
          this.overlays[i].setMap(null);
        }

        const position = new kakao.maps.LatLng(lat, lng);
        this.overlays.push(
          new kakao.maps.CustomOverlay({
            map: this.map,
            position: position,
            content: content,
            yAnchor: 1,
          })
        );
        this.map.setCenter(position);
        this.map.setLevel(4);
      };
      // console.log(this.overlays);
      kakao.maps.event.addListener(marker, "click", handleClick);

      this.markers.push(marker);
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
