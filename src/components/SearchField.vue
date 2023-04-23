<template>
  <div class="search-field">
    <div class="input-container">
      <input
        type="text"
        v-model="searchText"
        @input="updateSuggestions"
        @keydown.enter="selectSuggestion"
        placeholder="Add new node..."
      />
      <ul v-if="suggestions.length" class="suggestion-list">
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectSuggestion(index)"
        >
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchField",
  setup(props, { emit }) {
    const searchText = ref("");
    const suggestions = ref([]);
    const allNodes = [
      {
        id: 0,
        name: "Dummy Node",
        numInputs: 1,
        numOutputs: 1,
        type: "Source",
        color: "#c6d157",
        icon: "dummy_node.png",
      },
      {
        id: 1,
        name: "Data Generator",
        numInputs: 0,
        numOutputs: 2,
        type: "Source",
        color: "#f19a4a",
        icon: "data_generator.png",
      },
      {
        id: 2,
        name: "CASE Switch Data (Start)",
        numInputs: 1,
        numOutputs: 3,
        type: "Manipulator",
        color: "#f9da49",
        icon: "case_switch_start.png",
      },
      {
        id: 3,
        name: "Cluster Assigner",
        numInputs: 1,
        numOutputs: 1,
        type: "Predictor",
        color: "#60b259",
        icon: "cluster_assigner.png",
      },
      {
        id: 4,
        name: "Cell Extractor",
        numInputs: 1,
        numOutputs: 1,
        type: "Manipulator",
        color: "#f9da49",
        icon: "cell_extractor.png",
      },
    ];

    const updateSuggestions = () => {
      suggestions.value = allNodes.filter((node) =>
        node.name.toLowerCase().includes(searchText.value.toLowerCase())
      );
    };

    const selectSuggestion = (index = -1) => {
      if (index < 0) {
        index = suggestions.value.findIndex(
          (suggestion) =>
            suggestion.toLowerCase() === searchText.value.toLowerCase()
        );
      }

      if (index >= 0) {
        const selectedNode = suggestions.value[index];
        searchText.value = "";
        suggestions.value = [];
        // Emit the event with the selected node
        emit("add-node", selectedNode);
      }
    };

    return { searchText, suggestions, updateSuggestions, selectSuggestion };
  },
});
</script>

<style scoped>
.search-field {
  margin: 10px;
}

.input-container {
  position: relative;
  display: inline-block;
}

input {
  width: 200px;
}

.suggestion-list {
  position: absolute;
  background-color: white;
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.suggestion-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestion-list li:hover {
  background-color: #eee;
}
</style>
