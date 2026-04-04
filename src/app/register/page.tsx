"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Home, ShoppingBag, UserPlus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "@/hooks/useTranslation";

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      router.push("/");
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#f7f6f4] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ShoppingBag className="w-6 h-6 text-[#3a7d44] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl tracking-tight">COZY<span className="text-[#3a7d44]">CORNER</span></span>
        </Link>
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#3a7d44] transition-colors">
          <Home className="w-4 h-4" /> {t('back_to_store')}
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#3a7d44]/10 flex items-center justify-center">
                <UserPlus className="w-7 h-7 text-[#3a7d44]" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center font-albert-sans mb-1">{t('create_account')}</h1>
            <p className="text-gray-400 text-sm text-center mb-8">{t('join_msg')}</p>

            {displayError && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6 border border-red-100">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('full_name')}</label>
                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d44]/30 focus:border-[#3a7d44] transition-all bg-gray-50"
                  placeholder={t('name_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('email_address')}</label>
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d44]/30 focus:border-[#3a7d44] transition-all bg-gray-50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('password_label')}</label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d44]/30 focus:border-[#3a7d44] transition-all bg-gray-50"
                    placeholder={t('password_placeholder_reg')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('confirm_password')}</label>
                <input
                  id="register-confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d44]/30 focus:border-[#3a7d44] transition-all bg-gray-50"
                  placeholder={t('confirm_password_placeholder')}
                />
              </div>

              <button
                id="register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3a7d44] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#2d6235] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-2"
              >
                {isLoading ? t('creating_account') : t('create_account')}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-sm text-gray-400">{t('or_label')}</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="mt-6 flex justify-center w-full [&>div]:w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    const success = await useAuthStore.getState().loginWithGoogle(credentialResponse.credential);
                    if (success) router.push("/");
                  }
                }}
                onError={() => {
                  console.error("Google Login Failed");
                }}
                shape="rectangular"
                text="signup_with"
                size="large"
                width="100%"
              />
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {t('already_have_account')}{" "}
              <Link href="/login" className="text-[#3a7d44] font-semibold hover:underline">
                {t('sign_in')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
