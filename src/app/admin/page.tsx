"use client"
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { Package, ShoppingBag, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const productCount = useProductStore((state) => state.products.length);

  const stats = [
    { label: "Total Products", value: productCount, icon: Package, color: "bg-blue-500" },
    { label: "Total Sales", value: "$12,840", icon: TrendingUp, color: "bg-green-500" },
    { label: "Active Orders", value: "24", icon: ShoppingBag, color: "bg-purple-500" },
    { label: "Customers", value: "1,240", icon: Users, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-albert-sans">Dashboard</h1>
        <p className="text-gray-500 font-roboto mt-1">Welcome back, Admin. Here's a summary of your store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-gray-700">New order #ORD-202{i} placed by Customer Name</p>
                <span className="ml-auto text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Inventory Status</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-700">In Stock Products</span>
               <span className="font-bold text-green-600">{productCount}</span>
             </div>
             <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-[85%]" />
             </div>
             <p className="text-xs text-gray-400">Your inventory level is healthy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
