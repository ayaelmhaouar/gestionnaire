import { useEffect, useState } from "react";
import API from "../api/api";
import "./Dashboard.css"; 


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data ? res.data.data : res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage("Erreur lors du chargement des tâches");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
      setMessage("Tâche ajoutée avec succès !");
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage("Erreur lors de l'ajout de la tâche");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
      setMessage("Tâche supprimée avec succès !");
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage("Erreur lors de la suppression de la tâche");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <form className="dashboard-form" onSubmit={handleAddTask}>
        <input
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {message && <p className="message">{message}</p>}

      <ul className="task-list">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <span>
                <strong>{task.title}</strong> - {task.description}
              </span>
              <button onClick={() => handleDelete(task.id)}>Supprimer</button>
            </li>
          ))
        ) : (
          <li>Aucune tâche disponible</li>
        )}
      </ul>
    </div>
  );
}
