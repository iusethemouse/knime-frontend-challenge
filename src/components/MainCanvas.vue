<template>
  <div class="main-canvas">
    <SearchField @add-node="addNodeFromSearch" />
    <NodeObject
      v-for="node in nodes"
      :key="node.nodeObject.id"
      :initialX="node.x"
      :initialY="node.y"
      :name="node.nodeObject.name"
      :numInputs="node.nodeObject.numInputs"
      :numOutputs="node.nodeObject.numOutputs"
      :type="node.nodeObject.type"
      :color="node.nodeObject.color"
      :icon="node.nodeObject.icon"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchField from "./SearchField.vue";
import NodeObject from "./NodeObject.vue";

const nodes = ref([]);

const addNodeFromSearch = (nodeObject) => {
  const x = 100;
  const y = 100;
  nodes.value.push({ nodeObject, x, y });
};
</script>

<style scoped>
.main-canvas {
  border: 10px solid #f9d949;
  margin: 50px;
  height: calc(100vh - 150px);
  width: calc(100vw - 150px);
  position: relative;
}
</style>
