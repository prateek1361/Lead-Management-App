import { Link } from "react-router-dom";
import useFetch from "../useFetch";

export default function AgentManagement() {
  const {
    data: agents,
    loading,
    error,
  } = useFetch("https://project-2-beige-three.vercel.app/agents");

  return (
    <div className="bg-body-secondary">
      <div className="row">
        <div className="col-md-3 bg-light px-5 p-4">
          <div className="container mt-2 vh-100">
            <h2 className=" mb-4">Anvaya CRM</h2>
            <hr />
            <Link className="nav-link fs-4 d-flex gap-3 " to="/">
              <i className="bi bi-arrow-90deg-left"></i>
              Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="col-md-9 p-4 px-5">
          <div className="container">
            <h1 className="mb-4">Sales Agent Management</h1>
            {loading ? (
              <p>Loading agents...</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {agents?.map((agent) => (
                  <div key={agent._id} className="bg-light p-3 rounded shadow">
                    <p>
                      <strong>Agent:</strong> {agent.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {agent.email}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Link to="/agentForm" className="btn btn-primary">
                + Add New Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
