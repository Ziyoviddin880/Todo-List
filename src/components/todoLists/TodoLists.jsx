import React from "react";
import { useDispatch } from "react-redux";
import { checkTodo, deleteTodo } from "../../store/todoSlice/todoSlice";
import EditTodo from "../editTodo/EditTodo";

const TodoLists = ({ todo, option }) => {
  const dispatch = useDispatch();
  return (
    <>
      {todo ? (
        <div className="card my-2 ">
          <div className="card-body">
            <h5 className="card-title">Task title</h5>
            <p className="card-text">{todo.name}</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => {
                  dispatch(checkTodo({ id: todo.id, option }));
                }}
                checked={todo.condition}
                disabled={todo.condition}
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {todo.condition ? "Finished" : "Unfinished"}
              </label>
            </div>
            <div>
              <b>Deadline:</b> {todo.deadLine}
            </div>
            <div className=" my-2 d-flex justify-content-between align-items-center  ">
              <EditTodo todo={todo} option={option} />
              <button
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        "There is Nothing"
      )}
    </>
  );
};

export default TodoLists;
