<template>
  <div ref="draggableNode" class="node-object">
    <div class="node-container">
      <p class="node-name">{{ name }}</p>
      <div class="node-body-container">
        <div class="inputs">
          <InputPort v-for="(input, index) in numInputs" :key="index" />
        </div>
        <div class="node-body" :style="{ backgroundColor: color }">
          <img :src="icon" alt="Node icon" class="node-icon" />
        </div>
        <div class="outputs">
          <OutputPort v-for="(output, index) in numOutputs" :key="index" />
        </div>
      </div>
      <NodeStatus />
      <p class="node-type">{{ type }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import interact from "interactjs";
import InputPort from "./node-components/InputPort.vue";
import OutputPort from "./node-components/OutputPort.vue";
import NodeStatus from "./node-components/NodeStatus.vue";

const props = defineProps({
  initialX: {
    type: Number,
    required: true,
  },
  initialY: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  numInputs: {
    type: Number,
    required: true,
  },
  numOutputs: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const screenX = ref(props.initialX);
const screenY = ref(props.initialY);
const draggableNode = ref(null);

const initInteract = (selector) => {
  interact(selector.querySelector(".node-body")).draggable({
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    },
    onmove: dragMoveListener,
    onend: onDragEnd,
  });
};

const dragMoveListener = (event) => {
  event.stopPropagation();

  const selector = event.target.closest(".node-object");

  const initialX = parseFloat(selector.getAttribute("data-x")) || 0;
  const initialY = parseFloat(selector.getAttribute("data-y")) || 0;

  const x = initialX + event.dx;
  const y = initialY + event.dy;

  selector.style.webkitTransform = selector.style.transform =
    "translate(" + x + "px, " + y + "px)";

  selector.setAttribute("data-x", x.toString());
  selector.setAttribute("data-y", y.toString());
};

const onDragEnd = (event) => {
  const target = event.target;
  screenX.value = target.getBoundingClientRect().left;
  screenY.value = target.getBoundingClientRect().top;
};

onMounted(() => {
  if (draggableNode.value) {
    const initialTransform = `translate(${screenX.value}px, ${screenY.value}px)`;
    draggableNode.value.style.transform = initialTransform;
    draggableNode.value.setAttribute("data-x", screenX.value.toString());
    draggableNode.value.setAttribute("data-y", screenY.value.toString());
    initInteract(draggableNode.value);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
.node-object {
  padding: 5px;
  position: absolute;
}
.node-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-body-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.node-body {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 100%;
  height: 100%;
}

.node-name {
  margin: 0;
  margin-bottom: 5px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}

.node-status,
.node-type {
  margin: 0;
  margin-top: 5px;
}

.inputs,
.outputs {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 0;
  bottom: 0;
}

.inputs {
  left: -10px;
}

.outputs {
  right: -10px;
}
</style>
