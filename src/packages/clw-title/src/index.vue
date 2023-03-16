<template>
  <div class="clw-title">
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: "CTitle",
};
</script>

<style lang="less" scoped>
.clw-title {
  height: 25px;
  padding-left: 15px;
  width: 100%;
  margin-bottom: 20px;
  span {
    padding-left: 15px;
    line-height: 35px;
    border-left: 5px solid #66b1ff;
    font-size: 16px;
    font-weight: 600;
    color: #354b5c;
  }
}
</style>