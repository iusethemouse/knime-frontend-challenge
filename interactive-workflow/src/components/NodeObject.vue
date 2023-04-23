<template>
  <div ref="draggableNode" class="node-object">
    <div class="node-container">
      <p class="node-name">{{ name }}</p>
      <div class="node" :style="{ backgroundColor: color }">
        <img :src="iconPath" alt="Node icon" class="node-icon" />
        <div class="inputs">
          <InputPort v-for="(input, index) in numInputs" :key="index" />
        </div>
        <div class="outputs">
          <OutputPort v-for="(output, index) in numOutputs" :key="index" />
        </div>
      </div>
      <div>
        <NodeStatus />
      </div>
      <p class="node-type">{{ type }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import interact from "interactjs";
import InputPort from "./node-components/InputPort.vue";
import OutputPort from "./node-components/OutputPort.vue";
import NodeStatus from "./node-components/NodeStatus.vue";

export default defineComponent({
  name: "NodeObject",
  components: {
    InputPort,
    OutputPort,
    NodeStatus,
  },
  props: {
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
  },
  setup(props) {
    const screenX = ref(props.initialX);
    const screenY = ref(props.initialY);
    const draggableNode = ref(null);

    const iconPath = computed(() => {
      return require(`../assets/${props.icon}`);
    });

    const initInteract = (selector) => {
      interact(selector).draggable({
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

      const target = event.target;

      const initialX = parseFloat(target.getAttribute("data-x")) || 0;
      const initialY = parseFloat(target.getAttribute("data-y")) || 0;

      const x = initialX + event.dx;
      const y = initialY + event.dy;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      target.setAttribute("data-x", x.toString());
      target.setAttribute("data-y", y.toString());
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

    return { draggableNode, screenX, screenY, iconPath };
  },
});
</script>

<style scoped>
.node-object {
  /* border-radius: 5%; */
  border: 1px solid black;
  /* width: 70px; */
  /* height: 70px; */
  /* background-color: rgb(255, 149, 51); */
  /* color: #fff; */
  padding: 5px;
  position: absolute;
}
.node-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.node-name {
  margin: 0;
  margin-bottom: 5px;
}

.node {
  border-radius: 3px;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
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

.node-status {
  margin: 0;
  margin-top: 5px;
}

.node-type {
  margin: 0;
  margin-top: 5px;
}

.node-icon {
  width: 20px;
  height: 20px;
}
</style>
