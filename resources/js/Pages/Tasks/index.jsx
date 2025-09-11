import { createInertiaApp } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';

export default function Tasks({ tasks, users, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        assigned_to: '',
        status: 'à faire'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    const changeStatus = (task, status) => {
        router.patch(route('tasks.update', task.id), { status });
    };

    const deleteTask = (taskId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            router.delete(route('tasks.destroy', taskId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Mes tâches</h2>}
        >
            <Head title="Tâches" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Formulaire de création */}
                    <form onSubmit={submit} className="mb-6 p-4 bg-white rounded-lg shadow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                <input
                                    type="text"
                                    placeholder="Titre de la tâche"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assigné à</label>
                                <select
                                    value={data.assigned_to}
                                    onChange={(e) => setData('assigned_to', e.target.value)}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Sélectionner un utilisateur</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                {errors.assigned_to && <div className="text-red-600 text-sm mt-1">{errors.assigned_to}</div>}
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                placeholder="Description de la tâche"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full border p-2 rounded"
                                rows={3}
                            />
                            {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {processing ? 'Création...' : 'Créer la tâche'}
                        </button>
                    </form>

                    {/* Liste des tâches */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigné à</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                                            <td className="px-6 py-4">{task.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => changeStatus(task, e.target.value)}
                                                    className="border p-1 rounded text-sm"
                                                >
                                                    <option value="à faire">À faire</option>
                                                    <option value="en cours">En cours</option>
                                                    <option value="terminé">Terminé</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {task.assigned_to ? users.find(u => u.id === task.assigned_to)?.name : 'Non assigné'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route('tasks.edit', task.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Aucune tâche n'a été créée pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}