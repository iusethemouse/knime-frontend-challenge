<template>
  <div class="search-field">
    <div class="input-container">
      <input
        class="search-input"
        type="text"
        v-model="searchText"
        @input="updateSuggestions"
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

<script setup>
import { ref } from "vue";
import allNodes from "../assets/mock_nodes.js";

const emit = defineEmits(["add-node"]);
const searchText = ref("");
const suggestions = ref([]);

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
    emit("add-node", selectedNode);
  }
};
</script>

<style scoped>
.search-field {
  margin: 20px;
}

.input-container {
  position: relative;
  display: inline-block;
}

.search-input {
  width: 400px;
  padding: 10px;
  border: 3px solid #000000;
  border-radius: 2px;
  box-sizing: border-box;
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
