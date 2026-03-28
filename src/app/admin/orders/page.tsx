import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <div>
        <h1 className="text-3xl font-bold font-albert-sans text-gray-900">Orders Management</h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          The order management system is currently under maintenance. You will soon be able to view and manage all customer transactions here.
        </p>
      </div>
      <Link 
        href="/admin" 
        className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
