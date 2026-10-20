'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '@/store/slices/logSlice';
import { RootState, AppDispatch } from '@/store/store';

export default function LogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { logs, loading, error } = useSelector((state: RootState) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <table className="w-full table-auto border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={log.id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{log.user?.name || 'N/A'}</td>
              <td className="border p-2">{log.action}</td>
              <td className="border p-2">{log.description}</td>
              <td className="border p-2">{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
