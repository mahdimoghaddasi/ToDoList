// import { useState } from "react";
import ErrorPage from "../../error-page";
import Logic from "./logic";
import { Checkbox, Spinner } from "@nextui-org/react";

const HomePage = () => {
  const {
    todos,
    isFetching,
    isSuccess,
    changeCompleteHandler,
    setFilterHandler,
    startEditing,
    saveTitleHandler,
    filter,
    data,
    editingTodoId,
    newTitle,
    setNewTitle,
  } = Logic();

  return isFetching ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner />
    </div>
  ) : isSuccess && todos.length > 0 ? (
    <div className="space-y-4 mt-4 w-full bg-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterHandler("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterHandler("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterHandler("incomplete")}
          >
            Incomplete
          </button>
        </div>
      </div>

      <div>all : {data.length}</div>
      
      <div>
        completed : {data.filter((item) => item.completed === true).length}
      </div>
      <div>
        incomplete : {data.filter((item) => item.completed === false).length}
      </div>

      {todos.map((item) => (
        <div key={item.id}>
          <div className="mt-4 w-full bg-white rounded-2xl shadow-md p-4">
            <div className="grid grid-cols-5 gap-4 p-2 rounded w-full">
              <div className="col-span-2 flex flex-col gap-4">
                <div className="col-span-1">Title :</div>
                <div className="col-span-1">
                  {editingTodoId === item.id ? (
                    <input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="border p-2 rounded"
                    />
                  ) : (
                    item.title
                  )}
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="col-span-1">is completed :</div>
                <div className="col-span-1">
                  <Checkbox
                    isSelected={item.completed}
                    onValueChange={(isSelected) =>
                      changeCompleteHandler(isSelected, item.id)
                    }
                  ></Checkbox>
                </div>
              </div>
              <div className="col-span-2 flex justify-end gap-4">
                {editingTodoId === item.id ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => saveTitleHandler(item.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => startEditing(item.id, item.title)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>{ErrorPage}</div>
  );
};

export default HomePage;
