

import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icons from 'react-native-vector-icons/MaterialIcons';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .label('Title')
    .required('Title is required'),
  description: Yup.string()
    .label('Description')
    .required('Description is required'),
  status: Yup.string()
    .label('Status')
    .required('Status is required'),
});

const Todoscreen = () => {
  const [todolist, setTodolist] = useState([]);
  const [edit, setEdit] = useState(null);

  const addTodo = (values, actions) => {
    if (edit) {
      // Update existing TODO
      const updatedTodos = todolist.map((item) =>
        item.id === edit.id ? { ...item, title: values.title, description: values.description, status: values.status } : item
      );
      setTodolist(updatedTodos);
      setEdit(null);
    } else {
      // Add new TODO
      setTodolist([...todolist, { id: Date.now().toString(), title: values.title, description: values.description, status: values.status }]);
    }
    actions.resetForm();
  };

  const editTodo = (item) => {
    setEdit(item);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todolist.filter((todo) => todo.id !== id);
    setTodolist(updatedTodos);
  };

  const renderTodo = ({ item }) => {
    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>Title: {item.title}</Text>
        <Text style={styles.todoTitle}>Description: {item.description}</Text>
        <Text style={styles.todoTitle}>Status: {item.status}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style = {styles.iconstyl}onPress={() => editTodo(item)}>
            <Icons name='edit' size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style = {styles.iconstyl}onPress={() => deleteTodo(item.id)}>
            <Icons name='delete' size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ title: '', description: '', status: '' }}
        onSubmit={(values, actions) => addTodo(values, actions)}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <View>
            <TextInput
              style={styles.inputField}
              placeholder="Add Title"
              onChangeText={formikProps.handleChange('title')}
              onBlur={formikProps.handleBlur('title')}
              value={formikProps.values.title}
            />
            {formikProps.touched.title && formikProps.errors.title &&
              <Text style={styles.errorText}>{formikProps.errors.title}</Text>
            }

            <TextInput
              style={styles.inputField}
              placeholder="Add Description"
              onChangeText={formikProps.handleChange('description')}
              onBlur={formikProps.handleBlur('description')}
              value={formikProps.values.description}
            />
            {formikProps.touched.description && formikProps.errors.description &&
              <Text style={styles.errorText}>{formikProps.errors.description}</Text>
            }

            <TextInput
              style={styles.inputField}
              placeholder="Add Status"
              onChangeText={formikProps.handleChange('status')}
              onBlur={formikProps.handleBlur('status')}
              value={formikProps.values.status}
            />
            {formikProps.touched.status && formikProps.errors.status &&
              <Text style={styles.errorText}>{formikProps.errors.status}</Text>
            }

            <TouchableOpacity style={styles.btnStyle} onPress={formikProps.handleSubmit}>
              <Text style={styles.btnText}>{edit ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <FlatList
        data={todolist}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </ScrollView>
  );
};

export default Todoscreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor:"green"
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  btnStyle: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 15,
    width: 250,
    alignSelf: "center"
  },
  todoContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#00BBDC',
  },
  todoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  iconstyl:{
   
    marginVertical:20,
    marginHorizontal:20,
   
   
  }
});
