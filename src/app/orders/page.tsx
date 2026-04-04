"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const STATUS_STYLES: Record<string, { icon: any; color: string; bg: string }> = {
  Processing: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
  Delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  Cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
};

export default function OrdersPage() {
  const { token, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }
    fetch("/api/orders/my", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAuthenticated, token, router]);

  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 flex items-center gap-4">
          <Link href="/" className="text-text-muted hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-albert-sans">My Orders</h1>
            <p className="text-text-muted text-sm mt-1">Track your past and current orders</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-bg-light rounded-xl">
            <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-albert-sans font-semibold text-gray-400 mb-2">No orders yet</h2>
            <p className="text-sm text-gray-400 mb-6">When you place an order, it'll show up here.</p>
            <Link href="/shop" className="inline-block bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const { icon: Icon, color, bg } = STATUS_STYLES[order.orderStatus] ?? STATUS_STYLES.Processing;
              return (
                <div key={order._id} className="bg-white border border-border-light rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-50">
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Order ID</p>
                      <p className="font-mono text-sm font-semibold text-foreground">{order._id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${bg} ${color}`}>
                        <Icon className="w-3.5 h-3.5" /> {order.orderStatus}
                      </span>
                      <span className="text-sm font-bold font-albert-sans">${order.pricing?.total?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{item.name} <span className="text-text-muted">×{item.quantity}</span></span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-text-muted">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
