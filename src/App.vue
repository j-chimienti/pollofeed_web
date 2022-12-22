<template>
  <div>
    <iframe
      style="height: 0px; width: 0px; visibility: hidden"
      src="about:blank"
    >
      this frame prevents back forward cache
    </iframe>
    <img
      class="bg"
      sizes="(max-width: 1400px) 100vw, 1400px"
      srcset="
        ./assets/img/background3/background3_gg2mxc_c_scale_w_200.png   200w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_475.png   475w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_675.png   675w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_829.png   829w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_959.png   959w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_1047.png 1047w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_1150.png 1150w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_1156.png 1156w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_1327.png 1327w,
        ./assets/img/background3/background3_gg2mxc_c_scale_w_1400.png 1400w
      "
      src="./assets/img/background3/background3_gg2mxc_c_scale_w_1400.png"
      width="1400"
      alt=""
    />
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "App",
})
</script>

<style>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
