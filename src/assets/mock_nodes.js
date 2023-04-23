// we have to manually import all icons due to a Stackblitz bug
import dummyNodeIcon from "./dummy_node.png";
import dataGeneratorIcon from "./data_generator.png";
import caseSwitchStartIcon from "./case_switch_start.png";
import clusterAssignerIcon from "./cluster_assigner.png";
import cellExtractorIcon from "./cell_extractor.png";

const allNodes = [
    {
      id: 0,
      name: "Dummy Node",
      numInputs: 1,
      numOutputs: 1,
      type: "Source",
      color: "#c6d157",
      // icon: "dummy_node.png",
      icon: dummyNodeIcon,
    },
    {
      id: 1,
      name: "Data Generator",
      numInputs: 0,
      numOutputs: 2,
      type: "Source",
      color: "#f19a4a",
      // icon: "data_generator.png",
      icon: dataGeneratorIcon,
    },
    {
      id: 2,
      name: "CASE Switch Data (Start)",
      numInputs: 1,
      numOutputs: 3,
      type: "Manipulator",
      color: "#f9da49",
      // icon: "case_switch_start.png",
      icon: caseSwitchStartIcon,
    },
    {
      id: 3,
      name: "Cluster Assigner",
      numInputs: 1,
      numOutputs: 1,
      type: "Predictor",
      color: "#60b259",
      // icon: "cluster_assigner.png",
      icon: clusterAssignerIcon,
    },
    {
      id: 4,
      name: "Cell Extractor",
      numInputs: 1,
      numOutputs: 1,
      type: "Manipulator",
      color: "#f9da49",
      // icon: "cell_extractor.png",
      icon: cellExtractorIcon,
    },
  ];

    export default allNodes;