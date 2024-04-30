import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../../store/todoSlice/todoSlice";

const EditTodo = ({ todo, option }) => {
  const [checkVal, setCheckVal] = useState(todo.condition);
  const [editName, setEditName] = useState(todo.name);
  const [editTime, setEditTime] = useState(todo.deadLine);
  const dispatch = useDispatch();
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const nextDayISO = nextDay.toISOString().split("T")[0];

  const edited = () => {
    if (
      todo.condition !== checkVal ||
      todo.name !== editName ||
      todo.deadLine !== editTime
    ) {
      dispatch(
        editTodo({
          todo: {
            name: editName,
            id: todo.id,
            condition: checkVal,
            deadLine: editTime,
          },
          option,
        })
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className=" btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={"#" + todo.id}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={todo.id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Task name
                </label>
                <input
                  onChange={(e) => setEditName(e.target.value)}
                  type="text"
                  className="form-control"
                  value={editName}
                  id="exampleInputEmail1"
                />
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => setCheckVal(!checkVal)}
                    defaultChecked={checkVal}
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {checkVal ? "Finished" : "Unfinished"}
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Deadline
                  </label>
                  <input
                    onChange={(e) => setEditTime(e.target.value)}
                    value={editTime}
                    type="date"
                    min={nextDayISO}
                    required
                    className="form-control"
                    id="date"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss={
                  todo.condition !== checkVal ||
                  todo.name !== editName ||
                  todo.deadLine !== editTime
                    ? "modal"
                    : ""
                }
                onClick={edited}
              >
                Edit todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
