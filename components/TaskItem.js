import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
const TaskItem = ({ task, deleteTaskHandler }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 23, color: "#1FBB84" }}>{task.task}</Text>
      <TouchableWithoutFeedback onPress={() => deleteTaskHandler(task.id)}>
        <Entypo name="cross" size={35} color={"#1FBB84"} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    borderWidth: 0.2,
    borderColor: "#1FBB84",
    marginVertical: 2,
  },
});
