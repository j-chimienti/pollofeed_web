<template>
  <div class="main_btn">
    <span class="position-absolute span_btn"></span>
    <span class="position-absolute span_btn_two"></span>
    <button class="feed_btn">{{label}}</button>
  </div>
</template>

<script>
export default {
  name: "ButtonV3",
  props: {
    label: {
      type: String,
      default: "FEED NOW"
    }
  }
}
</script>

<style scoped>
.feed_btn {
  cursor: pointer;
  border: 5px solid orange;
  border-radius: 25px;
  color: #8e1116;
  font-weight: 800;
  padding: 15px 30px;
  outline: 5px solid #91181d !important;
  font-size: 24px;
  background-image: linear-gradient(
    180deg,
    #f4e795 -1.79%,
    #f4b331 26.77%,
    #f4b331 66.38%,
    #f4ad31 68.55%,
    #f48631 85.05%,
    #f46e31 98.22%,
    #f46531 106.3%
  ) !important;
}

.span_btn {
  background: #ffffff;
  cursor: pointer;
  opacity: 0.45;
  height: 5.25px;
  width: 12.06px;
  content: "";
  left: 10%;
  top: 16%;
  z-index: 2;
  border-radius: 10px;
}
.span_btn_two {
  background: #ffffff;
  opacity: 0.45;
  height: 5.35px;
  width: 22.1px;
  content: "";
  left: 18%;
  top: 16%;
  z-index: 2;
  border-radius: 10px;
}
.main_btn {
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}
.main_btn:hover {
  transform: translateY(-8px);
}
</style>
