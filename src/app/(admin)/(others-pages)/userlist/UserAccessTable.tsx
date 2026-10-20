'use client';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers,deleteUser, updateUser } from "@/store/slices/userSlice";
import { RootState, AppDispatch } from "@/store/store";
import Swal from 'sweetalert2';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const { user, roles, users, usersLoading, usersError } = useSelector(
    (state: RootState) => state.user
  );
  const isAdmin = roles.includes("admin");
  const hasAccess = roles.includes("admin") || roles.includes("doctor");

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      dispatch(deleteUser(id));
      Swal.fire('Deleted!', 'The user has been deleted.', 'success');
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email });
    setShowModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleUpdateSubmit = () => {
    if (selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, data: formData }));
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (hasAccess && !users.length) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, hasAccess, users.length]);

  if (!user) return <p>Loading user info...</p>;

  if (!hasAccess) {
    return <p className="text-red-500">Access denied: You do not have permission to view users.</p>;
  }

  if (usersError) {
    return <p className="text-red-500">{usersError}</p>;
  }

  if (usersLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      {/* <h2 className="text-xl font-semibold mb-4">User List</h2> */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role(s)</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border capitalize">{(u.roles || []).join(', ')}</td>
              <td className="p-2 border">
                {!isAdmin && (
                  <>
                    <button
                      onClick={() => openEditModal(u)}
                      className="text-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-9999" onClick={() => setShowModal(false)}>
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-semibold mb-4">Edit User</h3>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 mt-1"
            />
          </label>
          <label className="block mb-4">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleEditChange}
              className="w-full border px-2 py-1 mt-1"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateSubmit}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
