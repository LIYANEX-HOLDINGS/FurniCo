"use client"
import { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { Package, Plus, Search, Edit2, Trash2, X, Check } from "lucide-react";
import { Product } from "@/data/mockProducts";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const [formData, setFormData] = useState({
    name: "",
    brand: "Theme-Sky",
    price: 0,
    oldPrice: 0,
    category: "Chairs",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    isSale: false,
    rating: 5,
  });

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand || "Theme-Sky",
      price: product.price,
      oldPrice: product.oldPrice || 0,
      category: product.category || "Chairs",
      image: product.image,
      isSale: !!product.isSale,
      rating: product.rating || 5,
    });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      brand: "Theme-Sky",
      price: 0,
      oldPrice: 0,
      category: "Chairs",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
      isSale: false,
      rating: 5,
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    closeModal();
  };

  if (!isClient) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-foreground">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-albert-sans">Product Manager</h1>
          <p className="text-gray-500 font-roboto mt-1">Add, update, or remove products from your catalog.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold hover:bg-primary-hover transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden text-foreground">
        <div className="p-4 border-b border-gray-50 flex items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="ml-auto text-sm text-gray-500 font-roboto">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4 font-roboto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 relative bg-gray-100 rounded overflow-hidden shadow-sm">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-bold uppercase tracking-wider font-roboto">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col font-roboto">
                      <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      {product.oldPrice ? <span className="text-xs text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span> : null}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.isSale ? (
                      <span className="px-2 py-1 bg-red-50 text-red-600 rounded-md text-[10px] font-bold uppercase font-roboto">Sale</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-[10px] font-bold uppercase font-roboto">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-foreground">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete ${product.name}?`)) deleteProduct(product.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <Package className="w-16 h-16 text-gray-200 mb-4" />
              <p className="text-gray-400 font-roboto">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between text-foreground">
              <h3 className="text-xl font-bold font-albert-sans">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 text-foreground font-roboto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Product Name</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Brand</label>
                  <input 
                    type="text" required
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Price ($)</label>
                  <input 
                    type="number" required step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Old Price ($)</label>
                  <input 
                    type="number" step="0.01"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({...formData, oldPrice: parseFloat(e.target.value)})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2 col-span-full">
                  <label className="text-sm font-bold text-gray-700">Image URL</label>
                  <input 
                    type="text" required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-primary outline-none transition-colors"
                  >
                    <option>Chairs</option>
                    <option>Sofas</option>
                    <option>Tables</option>
                    <option>Lighting</option>
                    <option>Decor</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 md:mt-10">
                  <input 
                    type="checkbox" id="isSale" 
                    checked={formData.isSale}
                    onChange={(e) => setFormData({...formData, isSale: e.target.checked})}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                  <label htmlFor="isSale" className="text-sm font-bold text-gray-700 cursor-pointer">Mark as Sale</label>
                </div>
              </div>
              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 py-3 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-lg"
                >
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
