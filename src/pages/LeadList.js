import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LeadList() {
  const {
    data: leads,
    loading,
    error,
  } = useFetch("https://project-2-beige-three.vercel.app/leads");

  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredLeads = leads
    ?.filter((lead) => {
      return (
        (statusFilter ? lead.status === statusFilter : true) &&
        (agentFilter ? lead.assignedAgent?._id === agentFilter : true)
      );
    })
    .sort((a, b) => {
      if (sortOption === "priority") {
        return a.priority.localeCompare(b.priority); // assuming priority is a string
      } else if (sortOption === "time") {
        return new Date(a.timeToClose) - new Date(b.timeToClose);
      }
      return 0;
    });

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading leads</div>;

  const uniqueAgents = [
    ...new Map(
      leads
        .filter((lead) => lead.assignedAgent && lead.assignedAgent.name)
        .map((lead) => [lead.assignedAgent._id, lead.assignedAgent])
    ).values(),
  ];
  const uniqueStatuses = [...new Set(leads.map((lead) => lead.status))];

  return (
    <>
      <div className="bg-body-secondary">
        <div className="row flex-column flex-md-row min-vh-100">
          <div className="col-md-3 bg-light px-5 p-4">
            <h2 className=" mb-4">Anvaya CRM</h2>
            <hr />
            <Link className="nav-link fs-4 d-flex gap-3 " to="/">
              <i className="bi bi-arrow-90deg-left"></i>
              Back To Dashboard
            </Link>
          </div>
          <div className="col-md-9">
            <div className=" container p-4">
              <h1 className=" mb-4 ">Lead List:</h1>
              <div className="d-flex gap-3 mb-3 align-items-center flex-wrap ">
                <select
                  className="form-select w-auto bg-primary-subtle"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select w-auto bg-primary-subtle"
                  onChange={(e) => setAgentFilter(e.target.value)}
                >
                  <option value="">All Agents</option>
                  {uniqueAgents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select w-auto bg-primary-subtle"
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="priority">Priority</option>
                  <option value="time">Time to Close</option>
                </select>

                <Link to="/leadForm" className="btn btn-primary ms-auto">
                  + Add New Lead
                </Link>
              </div>

              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <Link
                    key={lead._id}
                    to={`/leadManagement/${lead._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div key={lead._id} className="card bg-light p-3 mb-3">
                      <p className="fw-bold fs-5">{lead.name}</p>
                      <p>
                        <strong>Status:</strong> {lead.status}
                      </p>
                      <p>
                        <strong>Assigned to:</strong> {lead.assignedAgent?.name}
                      </p>
                      <p>
                        <strong>Priority:</strong> {lead.priority}
                      </p>
                      <p>
                        <strong>Time to Close</strong>: {lead.timeToClose}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No leads found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
