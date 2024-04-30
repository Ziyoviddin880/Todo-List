import React from "react";
import TodoLists from "../todoLists/TodoLists";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { filterTodos, getLocalStorage } from "../../store/todoSlice/todoSlice";
import AddTodo from "../modal/AddTodo";
import { useState } from "react";
import { useEffect } from "react";

const Todo = () => {
  const { todoLists } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [option, setOption] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todoLists"))) {
      dispatch(getLocalStorage());
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-2 ">Todo Lists</h1>
      <div className="row">
        <div className="col-md-4 my-1 ">
          <select
            onChange={(e) => {
              dispatch(filterTodos(e.target.value));
              setOption(e.target.value);
            }}
            className="form-select form-select-md  "
          >
            <option disabled>Selected by</option>
            <option value="all">All</option>
            <option value="finished">Finished</option>
            <option value="unfinished">Unfinished</option>
          </select>
        </div>

        <div className="offset-md-4 col my-1 ">
          <AddTodo option={option} />
        </div>
      </div>
      <div className="row my-4">
        {todoLists.length < 1 ? (
          <div className="col-lg-4 col-md-6">
            <b className="bold-text">{option.toUpperCase()}</b>- not available
          </div>
        ) : (
          <>
            {todoLists.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <TodoLists option={option} todo={item} />
              </div>
            ))}
          </>
        )}
        {/* {todoLists.length > 0 ? (
          JSON.parse(localStorage.getItem("todoLists")) ? (
            <>
              {JSON.parse(localStorage.getItem("todoLists")).map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <TodoLists option={option} todo={item} />
                </div>
              ))}
            </>
          ) : (
            <>
              {todoLists.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <TodoLists option={option} todo={item} />
                </div>
              ))}
            </>
          )
        ) : (
          <div className="col-lg-4 col-md-6">
            <b className="bold-text">{option.toUpperCase()}</b>- not available
          </div>
        )} */}
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default Todo;
