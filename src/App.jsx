import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("list"));
    if (getData) {
      setData(getData);
    }
  }, []);

  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    //****TaskRequired*****//
    if (value == "") return toast.error("Task name is required");
    const isUnique = data.some((item) => item === value);

    if (isUnique) {
      toast.error("Task Name already exists");
      return;
    }
    setData((state) => [...state, value]);
    localStorage.setItem("list", JSON.stringify(data));
    setValue("");
    toast.success("Task Added Successfully!");
  };

  const deleteTask = (id) => {
    const newItems = data.filter((current, index) => {
      if (index !== id) return current;
    });

    setData(newItems);
    localStorage.setItem("list", JSON.stringify(newItems));

    toast.success("Task Removed Successfully!");
  };

  return (
    <>
      <div className="container">
        <h4 className="text-light">
          <i className="fa fa-1x fa-plus "></i> ADD NEW TASK
        </h4>
        <div className="card shadow-sm">
          <div className="card-body p-2">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="task"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter task..."
                />
                <button type="submit" className="btn btn-warning">
                  <i className="fa fa-plus-circle text-light"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <table
          style={{ fontSize: 12 }}
          className="table table-responsive table-bordered table-hover table-striped mt-5 bg-white"
        >
          <thead>
            <tr className="text-center">
              <th className="text-success" colSpan={2}>
                LIST OF TASKS
              </th>
            </tr>
            <tr>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td className="  d-flex justify-content-center">
                      <button
                        style={{ fontSize: 8 }}
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          deleteTask(index);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
