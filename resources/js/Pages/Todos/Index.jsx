import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import Chart from 'react-apexcharts'

export default function Index({ todos, filters, stats, flash }) {
  useEffect(() => {
    if (flash?.success) {
      Swal.fire('Berhasil', flash.success, 'success')
    }
  }, [flash])

  const onSearch = (e) => {
    router.get(
      route('todos.index'),
      {
        q: e.target.q.value,
        status: e.target.status.value,
      },
      { preserveState: true }
    )
    e.preventDefault()
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Todos</h2>}
    >
      <Head title="Todos" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          {/* chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold mb-4">Statistik Todos</h3>
            <Chart
              type="donut"
              height={250}
              series={[stats.done, stats.pending]}
              options={{
                labels: ['Selesai', 'Belum'],
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            {/* filter */}
            <form onSubmit={onSearch} className="flex flex-wrap gap-3 mb-4 items-center">
              <input
                name="q"
                defaultValue={filters.q || ''}
                placeholder="Cari judul..."
                className="border rounded-md px-3 py-2"
              />
              <select
                name="status"
                defaultValue={filters.status || ''}
                className="border rounded-md px-3 py-2"
              >
                <option value="">Semua status</option>
                <option value="done">Selesai</option>
                <option value="pending">Belum</option>
              </select>
              <button
                type="submit"
                className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
              >
                Terapkan
              </button>

              <Link
                href={route('todos.create')}
                className="ml-auto bg-emerald-500 text-white px-4 py-2 rounded-md text-sm"
              >
                + Tambah Todo
              </Link>
            </form>

            {/* table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Judul</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Cover</th>
                    <th className="text-left py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.data.map((todo) => (
                    <tr key={todo.id} className="border-b">
                      <td className="py-2">{todo.title}</td>
                      <td className="py-2">
                        {todo.is_done ? (
                          <span className="text-green-600">Selesai</span>
                        ) : (
                          <span className="text-orange-500">Belum</span>
                        )}
                      </td>
                      <td className="py-2">
                        {todo.cover ? (
                          <img
                            src={`/storage/${todo.cover}`}
                            alt=""
                            className="h-10 w-10 object-cover rounded"
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="py-2 space-x-2">
                        <Link
                          href={route('todos.edit', todo.id)}
                          className="text-slate-900 underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Hapus?',
                              text: 'Yakin hapus todo ini?',
                              icon: 'warning',
                              showCancelButton: true,
                            }).then((res) => {
                              if (res.isConfirmed) {
                                router.delete(route('todos.destroy', todo.id))
                              }
                            })
                          }}
                          className="text-red-500 underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}

                  {todos.data.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-4 text-center text-gray-400">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="mt-4 flex gap-2">
              {todos.links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                  className={`px-3 py-1 rounded ${
                    link.active ? 'bg-slate-900 text-white' : 'bg-slate-100'
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
