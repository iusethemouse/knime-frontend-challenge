<template>
  <div class="node-status">
    <div class="circle failed"></div>
    <div class="circle configurable"></div>
    <div class="circle executed"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.node-status {
  display: flex;
  justify-content: space-between;
  width: 35px;
  height: 14px;
  background-color: #d9dcdd;
  padding-right: 4px;
  padding-left: 4px;
  padding-top: 4px;
  border-radius: 2px;
  margin-top: 8px;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #000;
}

.circle.failed {
  /* background-color: #c22c54; */
  background-color: white;
}

.circle.configurable {
  /* background-color: #f9da49; */
  background-color: white;
}

.circle.executed {
  background-color: #60b259;
}
</style>
