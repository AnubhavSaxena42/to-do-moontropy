import React,{useState} from "react";
import { StyleSheet, Text,TextInput,TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Entypo,Ionicons } from "@expo/vector-icons";
const TaskItem = ({setTasks,tasks, task, deleteTaskHandler }) => {
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [newTask, setNewTask] = useState(task.task);
  const editTaskHandler = () => {
      
      const newTasks = tasks.map((item)=>{
        if(task.id===item.id){
          return {
            id:task.id,
            task:newTask
          }
        }
        return item
      })
      setTasks(newTasks)
      setIsEditTodo(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.todoContainer}>
        <Text style={{ fontSize: 23, color: "#1FBB84" }}>{task.task}</Text>
        <View style={styles.iconContainer}>
          <TouchableWithoutFeedback onPress={() => setIsEditTodo(!isEditTodo)}>
            <Entypo name="pencil" size={35} color={"#1FBB84"} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => deleteTaskHandler(task.id)}>
            <Entypo name="cross" size={35} color={"#1FBB84"} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {isEditTodo && (
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={(text) => {
              setNewTask(text);
            }}
            style={{
              padding: 5,
              fontSize: 13,
              backgroundColor: "gray",
              width: "80%",
              color: "white",
            }}
          />
          <TouchableOpacity onPress={editTaskHandler}>
            <Ionicons name="checkmark-sharp" size={30} color={"#1FBB84"} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    borderWidth: 0.2,
    borderColor: "#1FBB84",
    marginVertical: 2,
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer:{
    flexDirection:'row'
  },
  inputBox: {
    flexDirection: "row",
    marginTop: "4%",
  },
});
