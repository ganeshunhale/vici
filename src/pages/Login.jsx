import { useState } from "react";
import { Loader2, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/dashboardApi";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form).unwrap();

      localStorage.setItem("access_token", res.access_token);
      sessionStorage.setItem(
        "vicidial_auth",
        JSON.stringify({
          username: form.username,
          password: form.password,
        })
      );
      localStorage.setItem("user", JSON.stringify(res));

      navigate("/");
    } catch (err) {
      setError(err?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(231_58%_6%)]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[hsl(229_56%_13%)] shadow-xl border border-white/10">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Vicidial Login
        </h1>

        {error && (
          <p className="bg-red-500/10 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
