import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    source: "",
    assignedAgent: "",
    status: "New",
    priority: "Medium",
    timeToClose: "",
    tags: [],
  });

  const [agents, setAgents] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetch("https://project-2-beige-three.vercel.app/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://project-2-beige-three.vercel.app/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success("Lead Created");
    setForm({
      name: "",
      source: "",
      assignedAgent: "",
      status: "New",
      priority: "Medium",
      timeToClose: "",
      tags: [],
    });
    setTagInput("");
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

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
            <div className="container p-4">
              <form onSubmit={handleSubmit}>
                <h1 className=" mb-4">Add New Lead</h1>

                <input
                  className="form-control"
                  placeholder="Lead Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <br />

                <select
                  className="form-select"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                >
                  <option value="">Select Lead Source</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
                <br />

                <select
                  className="form-select"
                  value={form.assignedAgent}
                  onChange={(e) =>
                    setForm({ ...form, assignedAgent: e.target.value })
                  }
                >
                  <option value="">Select Sales Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
                <br />

                <select
                  className="form-select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
                <br />

                <select
                  className="form-select"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <br />

                <input
                  type="number"
                  className="form-control"
                  placeholder="Time to Close (in days)"
                  value={form.timeToClose}
                  onChange={(e) =>
                    setForm({ ...form, timeToClose: e.target.value })
                  }
                />
                <br />

                <div className="d-flex gap-2 align-items-center">
                  <input
                    className="form-control"
                    placeholder="Enter tag and click +"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addTag}
                  >
                    +
                  </button>
                </div>
                <br />

                {form.tags.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {form.tags.map((tag, index) => (
                      <span key={index} className="badge bg-primary fs-6">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button type="submit" className="btn btn-success">
                  Create Lead
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
