import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Setting() {
  const { data, loading, error } = useFetch(
    "https://project-2-beige-three.vercel.app/leads"
  );
  const [deletingId, setDeletingId] = useState(null);

  const [localLeads, setLocalLeads] = useState([]);

  if (data.length > 0 && localLeads.length === 0) {
    setLocalLeads(data);
  }

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const res = await fetch(
        `https://project-2-beige-three.vercel.app/leads/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete");

      setLocalLeads((prev) => prev.filter((lead) => lead._id !== id));
      toast.success("Lead Deleted");
    } catch (err) {
      toast.error("Error deleting lead");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-body-secondary">
      <div className="row flex-column flex-md-row min-vh-100">
        <div className="col-md-3 bg-light p-4 px-5">
          <h2 className=" mb-4">Anvaya CRM</h2>
          <hr />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fs-4 d-flex gap-3" to="/">
                <i className="bi bi-arrow-90deg-left"></i>
                Back To Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-md-9 p-4 px-5">
          <div className="container">
            <h1 className="mb-4">Settings - Manage Leads</h1>

            {loading ? (
              <p>Loading leads...</p>
            ) : error ? (
              <p className="text-danger">Failed to load leads.</p>
            ) : localLeads.length > 0 ? (
              localLeads.map((lead) => (
                <div key={lead._id} className="card bg-light p-3 mb-3">
                  <p className="fw-bold fs-5">{lead.name}</p>
                  <p>
                    <strong>Status:</strong> {lead.status}
                  </p>
                  <p>
                    <strong>Assigned Agent:</strong>{" "}
                    {lead.assignedAgent?.name || "Unassigned"}
                  </p>
                  <p>
                    <strong>Priority:</strong> {lead.priority}
                  </p>
                  <p>
                    <strong>Time to Close:</strong> {lead.timeToClose}
                  </p>

                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(lead._id)}
                    disabled={deletingId === lead._id}
                  >
                    {deletingId === lead._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))
            ) : (
              <p>No leads available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
