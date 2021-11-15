import Header from "./components/Header/Header";
import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskItem from "./components/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
export default function App() {
  const [isNewTodo, setIsNewTodo] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [init, setInit] = useState(true);
  const [tasks, setTasks] = useState([]);

  const setData = async () => {
    try {
      await AsyncStorage.setItem("Tasks", JSON.stringify(tasks));
      const res = await AsyncStorage.getItem("Tasks");
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const res = await AsyncStorage.getItem("Tasks");

      const retrievedTasks = JSON.parse(res);

      setTasks(retrievedTasks);
    } catch (err) {}
  };
  useEffect(() => {
    if (!init) setData();
  }, [tasks]);
  useEffect(() => {
    getData();
    setInit(false);
  }, []);

  const newTaskAddHandler = () => {
    const appendTask = {
      id: uuid(),
      task: newTask,
    };
    console.log(tasks)
    console.log(appendTask)
    const newTasks = [...tasks, appendTask];
    setNewTask("");
    setTasks(newTasks);
    setIsNewTodo(false);
  };
  const deleteTaskHandler = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addTaskContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsNewTodo(true);
          }}
        >
          <View style={styles.toDoAddBox}>
            <View style={styles.iconContainer}>
              <Ionicons name="add" size={20} color={"white"} />
            </View>
            <Text style={styles.addTaskText}>Add New To-Do</Text>
          </View>
        </TouchableOpacity>

        {isNewTodo && (
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
            <TouchableOpacity onPress={newTaskAddHandler}>
              <Ionicons name="checkmark-sharp" size={30} color={"#1FBB84"} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text
        style={{
          color: "#1FBB84",
          fontSize: 36,
          textAlign: "center",
          fontWeight: "900",
        }}
      >
        YOUR TASKS
      </Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => {
          return <TaskItem tasks={tasks} setTasks={setTasks} deleteTaskHandler={deleteTaskHandler} task={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginTop: StatusBar.currentHeight,
  },
  addTaskText: {
    color: "#1FBB84",
    fontSize: 28,
    fontWeight: "700",
  },
  addTaskContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#1FBB84",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    padding: 10,
    width: "100%",
    marginBottom: 5,
  },
  iconContainer: {
    paddingTop: 6,
    borderWidth: 2,
    borderColor: "#1FBB84",
    borderRadius: 5,
    marginRight: 5,
  },
  inputBox: {
    flexDirection: "row",
    marginTop: "4%",
  },
  toDoAddBox: {
    flexDirection: "row",
  },
});
