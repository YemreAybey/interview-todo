import {
  FETCH_TODOS,
  SET_TODOS,
  FETCH_ACTIVE_TODO,
  SET_ACTIVE_TODO,
  SET_ERRORS,
  SET_TODOS_UPDATED,
} from "../actions";

const FETCH_STATUSES = {
  IDLE: "idle",
  PENDING: "pending",
  FETCHED: "fetched",
};

const initialState = {
  fetchStatus: "idle",
  todos: [],
  errors: [],
  activeTodo: null,
  isTodosUpdated: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
    case FETCH_ACTIVE_TODO:
      return {
        ...state,
        fetchStatus: FETCH_STATUSES.PENDING,
      };
    case SET_TODOS:
      return {
        ...state,
        fetchStatus: FETCH_STATUSES.FETCHED,
        todos: action.todos,
        isTodosUpdated: false,
      };
    case SET_ACTIVE_TODO:
      return {
        ...state,
        fetchStatus: FETCH_STATUSES.FETCHED,
        activeTodo: action.todo,
      };
    case SET_ERRORS:
      return {
        ...state,
        fetchStatus: FETCH_STATUSES.IDLE,
        errors: [...state.errors, action.error],
        isTodosUpdated: false,
      };
    case SET_TODOS_UPDATED:
      return {
        ...state,
        isTodosUpdated: action.isUpdated,
      };

    default:
      return state;
  }
};

export default todoReducer;
