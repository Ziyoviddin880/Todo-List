import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  todoLists: [
    {
      name: "Work",
      id: 1,
      condition: false,
      deadLine: "2024-05-16",
    },
    {
      name: "Work 1",
      id: 2,
      condition: true,
      deadLine: "2024-05-18",
    },
    {
      name: "Work 2",
      id: 3,
      condition: false,
      deadLine: "2024-05-20",
    },
  ],
};
let filterState = [...initialState.todoLists];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteTodo: (state, action) => {
      const todoIndex = state.todoLists.findIndex((item) => {
        return item.id === action.payload;
      });
      state.todoLists.splice(todoIndex, 1);
      if (JSON.parse(localStorage.getItem("todoLists"))) {
        filterState = JSON.parse(localStorage.getItem("todoLists"));
      }
      const filterIndex = filterState.findIndex((item) => {
        return item.id === action.payload;
      });

      filterState.splice(filterIndex, 1);
      localStorage.setItem("todoLists", JSON.stringify(filterState));
      toast.success("Delete");
    },
    addTodo: (state, action) => {
      if (action.payload.option !== "finished") {
        state.todoLists = [...state.todoLists, action.payload.todo];
      }
      if (JSON.parse(localStorage.getItem("todoLists"))) {
        filterState = JSON.parse(localStorage.getItem("todoLists"));
      }
      filterState = [...filterState, action.payload.todo];

      localStorage.setItem("todoLists", JSON.stringify(filterState));
      toast.success("Add todo");
    },
    editTodo: (state, action) => {
      state.todoLists = state.todoLists.map((item) => {
        return item.id === action.payload.todo.id
          ? { ...action.payload.todo }
          : item;
      });
      if (action.payload.option === "finished") {
        state.todoLists = state.todoLists.filter((item) => {
          return item.condition === true;
        });
      } else if (action.payload.option === "unfinished") {
        state.todoLists = state.todoLists.filter((item) => {
          return item.condition === false;
        });
      } else {
        state.todoLists;
      }
      toast.success("Edit todo");
      if (JSON.parse(localStorage.getItem("todoLists"))) {
        filterState = JSON.parse(localStorage.getItem("todoLists"));
      }
      filterState = filterState.map((item) => {
        return item.id === action.payload.todo.id
          ? { ...action.payload.todo }
          : item;
      });
      localStorage.setItem("todoLists", JSON.stringify(filterState));
    },

    checkTodo: (state, action) => {
      if (
        action.payload.option === "unfinished" &&
        state.todoLists.length > 0
      ) {
        state.todoLists = state.todoLists.filter((item) => {
          return item.id !== action.payload.id;
        });
      } else {
        state.todoLists = state.todoLists.map((item) => {
          return item.id === action.payload.id
            ? { ...item, condition: true }
            : item;
        });
      }
      if (JSON.parse(localStorage.getItem("todoLists"))) {
        filterState = JSON.parse(localStorage.getItem("todoLists"));
      }
      filterState = filterState.map((item) => {
        return item.id === action.payload.id
          ? { ...item, condition: true }
          : item;
      });
      localStorage.setItem("todoLists", JSON.stringify(filterState));
    },

    filterTodos: (state, action) => {
      if (JSON.parse(localStorage.getItem("todoLists"))) {
        filterState = JSON.parse(localStorage.getItem("todoLists"));
        if (action.payload === "finished") {
          state.todoLists = filterState.filter((item) => {
            return item.condition === true;
          });
        } else if (action.payload === "unfinished") {
          state.todoLists = filterState.filter((item) => {
            return item.condition === false;
          });
        } else {
          state.todoLists = filterState;
        }
      }
    },

    getLocalStorage: (state) => {
      state.todoLists = [...JSON.parse(localStorage.getItem("todoLists"))];
      console.log(state.todoLists);
    },
  },
});

export const {
  deleteTodo,
  filterTodos,
  addTodo,
  checkTodo,
  editTodo,
  getLocalStorage,
} = todoSlice.actions;

export default todoSlice.reducer;
