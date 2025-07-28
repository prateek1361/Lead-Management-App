import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LeadManagement() {
  const { id } = useParams();
  const {
    data: lead,
    loading,
    error,
  } = useFetch(`https://project-2-beige-three.vercel.app/leads/${id}`);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editableLead, setEditableLead] = useState(null);

  useEffect(() => {
    fetch(`https://project-2-beige-three.vercel.app/leads/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => toast.error("Failed to load comments"));
  }, [id]);

  useEffect(() => {
    if (lead) {
      setEditableLead({
        status: lead.status,
        priority: lead.priority,
        timeToClose: lead.timeToClose,
      });
    }
  }, [lead]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(
          `https://project-2-beige-three.vercel.app/leads/${id}/comments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              commentText: newComment,
            }),
          }
        );

        if (response.ok) {
          const savedComment = await response.json();
          if (!savedComment?.commentText) {
            throw new Error("Invalid comment response");
          }
          setComments((prev) => [...prev, savedComment]);
          setNewComment("");
          toast.success("Comment added!");
        } else {
          toast.error("Failed to submit comment");
        }
      } catch (error) {
        toast.error("Error submitting comment");
      }
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `https://project-2-beige-three.vercel.app/leads/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editableLead),
        }
      );

      if (res.ok) {
        toast.success("Lead updated!");
        setIsEditing(false);

        Object.assign(lead, editableLead);
      } else {
        toast.error("Failed to update lead");
      }
    } catch {
      toast.error("Error updating lead");
    }
  };

  return (
    <div className="bg-body-secondary">
      <div className="row">
        <div className="col-md-3 bg-light p-4 px-5">
          <div className="container mt-2 vh-100">
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
        </div>

        <div className="col-md-9 p-4 px-5">
          <div className="container">
            <h1 className="mb-4">Lead Management</h1>

            {loading ? (
              <p>Loading lead details...</p>
            ) : error ? (
              <p>Error loading lead.</p>
            ) : (
              <>
                <div className="bg-light p-4 rounded shadow mb-4">
                  <h2 className="fw-bold mb-3">Lead Name: {lead.name}</h2>
                  <p>
                    <strong>Sales Agent: </strong>
                    {lead.assignedAgent?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Lead Source: </strong>
                    {lead.source}
                  </p>

                  {isEditing ? (
                    <>
                      <label>Status:</label>
                      <input
                        className="form-control mb-2"
                        value={editableLead.status}
                        onChange={(e) =>
                          setEditableLead({
                            ...editableLead,
                            status: e.target.value,
                          })
                        }
                      />

                      <label>Priority:</label>
                      <input
                        className="form-control mb-2"
                        value={editableLead.priority}
                        onChange={(e) =>
                          setEditableLead({
                            ...editableLead,
                            priority: e.target.value,
                          })
                        }
                      />

                      <label>Time to Close:</label>
                      <input
                        className="form-control mb-2"
                        type="number"
                        value={editableLead.timeToClose}
                        onChange={(e) =>
                          setEditableLead({
                            ...editableLead,
                            timeToClose: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn btn-success mt-2 me-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary mt-2"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Lead Status: </strong>
                        {lead.status}
                      </p>
                      <p>
                        <strong>Priority: </strong>
                        {lead.priority}
                      </p>
                      <p>
                        <strong>Time to Close: </strong>
                        {lead.timeToClose} days
                      </p>

                      <button
                        className="btn btn-secondary mt-3"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Lead Details
                      </button>
                    </>
                  )}
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-md fw-bold mb-3">Comments Section</h3>
                  {comments.length === 0 ? (
                    <p className="text-muted">No comments yet.</p>
                  ) : (
                    comments.map((c, index) => (
                      <div key={index} className="mb-3">
                        <strong>
                          <small>
                            {new Date(c.createdAt).toLocaleString()}
                          </small>
                        </strong>
                        <p className="mb-0">{c.commentText}</p>
                      </div>
                    ))
                  )}

                  <div className="mt-4">
                    <textarea
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Add new comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleAddComment}
                    >
                      Submit Comment
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
