import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import todoAPI from "../../api";
import {
  setTodos,
  setActivetodo,
  FETCH_TODOS,
  FETCH_ACTIVE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  setTodosUpdated,
  ADD_TODO,
} from "../actions";

const generateErrorMessage = (e) => {
  if (e.response && e.response.data && e.response.data.errors) {
    e.response.data.errors.forEach((error) => {
      toast.error(error.message);
    });
  } else {
    toast.error("Bir hata oluştu");
  }
};

const endpoints = {
  addTodo: "/api/todos",
  fetchTodos: "/api/todos",
  fetchActiveTodo: (id) => `/api/todos/${id}`,
  updateTodo: (id) => `/api/todos/${id}`,
  deleteTodo: (id) => `/api/todos/${id}`,
};

const services = {
  addTodo: (todo) => todoAPI.post(endpoints.addTodo, todo),
  fetchTodos: () => todoAPI.get(endpoints.fetchTodos),
  fetchActiveTodo: (id) => todoAPI.get(endpoints.fetchActiveTodo(id)),
  updateTodo: (id, newTodo) => todoAPI.put(endpoints.updateTodo(id), newTodo),
  deleteTodo: (id) => todoAPI.delete(endpoints.deleteTodo(id)),
};

function* fetchTodos(action) {
  try {
    const todos = yield call(services.fetchTodos);
    yield put(setTodos(todos.data));
  } catch (e) {
    generateErrorMessage(e);
  }
}

function* fetchActiveTodo(action) {
  try {
    const todo = yield call(services.fetchActiveTodo, action.todo);
    yield put(setActivetodo(todo.data));
  } catch (e) {
    generateErrorMessage(e);
  }
}

function* addTodo(action) {
  try {
    yield call(services.addTodo, action.todo);
    yield put(setTodosUpdated(true));
    toast.success("Todo is added successfuly");
  } catch (e) {
    generateErrorMessage(e);
  }
}

function* updateTodo(action) {
  try {
    yield call(services.updateTodo, action.id, action.newTodo);
    yield put(setTodosUpdated(true));
    toast.success("Todo is updated successfuly");
  } catch (e) {
    generateErrorMessage(e);
  }
}

function* deleteTodo(action) {
  try {
    yield call(services.deleteTodo, action.id);
    toast.success("Todo is deleted successfuly");
    yield put(setTodosUpdated(true));
  } catch (e) {
    generateErrorMessage(e);
  }
}

export default function* mySaga() {
  yield takeLatest(FETCH_TODOS, fetchTodos);
  yield takeLatest(ADD_TODO, addTodo);
  yield takeLatest(FETCH_ACTIVE_TODO, fetchActiveTodo);
  yield takeLatest(UPDATE_TODO, updateTodo);
  yield takeLatest(DELETE_TODO, deleteTodo);
}
