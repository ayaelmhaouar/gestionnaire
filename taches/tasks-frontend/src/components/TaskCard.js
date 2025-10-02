export default function TaskCard({ task }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "5px" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Status: {task.status}</small>
    </div>
  );
}
