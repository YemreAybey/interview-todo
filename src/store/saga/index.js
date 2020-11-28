import { call, put, takeLatest } from "redux-saga/effects";
import todoAPI from "../../api";
import {
  setTodos,
  setErrors,
  setActivetodo,
  FETCH_TODOS,
  FETCH_ACTIVE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  setTodosUpdated,
  ADD_TODO,
} from "../actions";

const endpoints = {
  addTodo: "/api/todos",
  fetchTodos: "/api/todos",
  fetchActiveTodo: (id) => `/api/todos/${id}`,
  updateTodo: (id) => `/api/todos/${id}`,
  deleteTodo: (id) => `/api/todos/${id}`,
};

const services = {
  addTodo: (todo) => todoAPI.get(endpoints.addTodo, todo),
  fetchTodos: todoAPI.get(endpoints.fetchTodos),
  fetchActiveTodo: (id) => todoAPI.get(endpoints.fetchActiveTodo(id)),
  updateTodo: (id, newTodo) => todoAPI.put(endpoints.updateTodo(id), newTodo),
  deleteTodo: (id) => todoAPI.delete(endpoints.deleteTodo(id)),
};

function* fetchTodos(action) {
  try {
    const todos = yield call(services.fetchTodos);
    yield put(setTodos(todos));
  } catch (e) {
    yield put(setErrors(e.response.errors));
  }
}

function* fetchActiveTodo(action) {
  try {
    const todo = yield call(services.addTodo, action.todo);
    yield put(setActivetodo(todo));
  } catch (e) {
    yield put(setErrors(e.response.errors));
  }
}

function* addTodo(action) {
  try {
    yield call(services.fetchActiveTodo, action.id);
    yield put(setTodosUpdated(true));
  } catch (e) {
    yield put(setErrors(e.response.errors));
  }
}

function* updateTodo(action) {
  try {
    yield call(services.updateTodo, action.id, action.newTodo);
    yield put(setTodosUpdated(true));
  } catch (e) {
    yield put(setErrors(e.response.errors));
  }
}

function* deleteTodo(action) {
  try {
    yield call(services.deleteTodo, action.id);
    yield put(setTodosUpdated(true));
  } catch (e) {
    yield put(setErrors(e.response.errors));
  }
}

export default function* mySaga() {
  yield takeLatest(FETCH_TODOS, fetchTodos);
  yield takeLatest(ADD_TODO, addTodo);
  yield takeLatest(FETCH_ACTIVE_TODO, fetchActiveTodo);
  yield takeLatest(UPDATE_TODO, updateTodo);
  yield takeLatest(DELETE_TODO, deleteTodo);
}
