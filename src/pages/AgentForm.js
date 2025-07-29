import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function AgentForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://project-2-beige-three.vercel.app/agents",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        toast.success("Agent created successfully!");
        setForm({ name: "", email: "" });
      } else {
        toast.error("Failed to create agent.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
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

        <div className="col-md-9 p-4 px-5">
          <div className="container">
            <h1 className=" mb-4">Add New Sales Agent</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                placeholder="Agent Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                type="email"
              />
              <button type="submit" className="btn btn-success">
                Create Agent
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
