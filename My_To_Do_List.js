import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const text = inputText.trim();

    if (text === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: text,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputText('');
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <TouchableOpacity
        style={styles.taskButton}
        onPress={() => toggleTask(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxDone,
          ]}
        >
          {item.completed && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>

        <Text
          style={[
            styles.taskText,
            item.completed && styles.taskCompleted,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <Text style={styles.subtitle}>
        {tasks.length === 0
          ? 'Add your first task below'
          : `${completedTasks} of ${tasks.length} completed`}
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>
              No tasks yet
            </Text>
            <Text style={styles.emptyText}>
              Type a task above and press Add.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },

  addButton: {
    height: 50,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  taskButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxDone: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },

  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },

  taskCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  deleteButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  deleteText: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 13,
  },

  empty: {
    alignItems: 'center',
    marginTop: 100,
  },

  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E7FF',
    color: '#4F46E5',
    textAlign: 'center',
    lineHeight: 60,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },

  emptyText: {
    fontSize: 14,
    color: '#6B7280'
  },
});
