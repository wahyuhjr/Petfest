import Link from "next/link";

export default function AdminSidebar() {
    return (
      <div className="admin-sidebar bg-gray-800 text-white w-64 min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2"><Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
            <li className="mb-2"><Link href="/admin/animals" className="block p-2 hover:bg-gray-700 rounded">Animals</Link></li>
            <li className="mb-2"><Link href="/admin/brands" className="block p-2 hover:bg-gray-700 rounded">Brands</Link></li>
          </ul>
        </nav>
      </div>
    );
  }