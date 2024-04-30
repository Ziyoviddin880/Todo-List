import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice/todoSlice";

const AddTodo = ({ option }) => {
  const [workName, setWorkName] = useState("");
  const [time, setTime] = useState("");

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const nextDayISO = nextDay.toISOString().split("T")[0];

  const dispatch = useDispatch();
  const submit = () => {
    if (workName) {
      dispatch(
        addTodo({
          todo: {
            name: workName,
            id: Date.now(),
            condition: false,
            deadLine: time,
          },
          option,
        })
      );
    }

    setWorkName("");
    setTime("");
  };

  return (
    <>
      <button
        type="button"
        className="w-100 btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Todo
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Todo
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
                  onChange={(e) => setWorkName(e.target.value)}
                  value={workName}
                  type="text"
                  required
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Deadline
                </label>
                <input
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  type="date"
                  min={nextDayISO}
                  required
                  className="form-control"
                  id="date"
                  aria-describedby="emailHelp"
                />
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
                data-bs-dismiss={workName ? "modal" : ""}
                onClick={submit}
              >
                Add todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
