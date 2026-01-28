import { useRef, useState } from "react";
import { Briefcase, ChevronDown, Loader2, Lock, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCampaignsQuery, useLoginMutation } from "../services/dashboardApi";
import { setUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const from = location.state?.from?.pathname;
  const [login, { isLoading }] = useLoginMutation();
const {data:campaingList,isLoading:campaingListLoading}= useGetCampaignsQuery();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null); 
  const justOpenedRef = useRef(false);

const handleMouseDown = () => {
  // about to open
  if (!isSelectOpen) {
    justOpenedRef.current = true;
    setIsSelectOpen(true);
  } else {
    justOpenedRef.current = false;
  }
};

const handleClick = () => {
  // first click after opening (ignore)
  if (justOpenedRef.current) {
    justOpenedRef.current = false;
    return;
  }
  // click again closes dropdown (same element), so flip arrow down
  setIsSelectOpen(false);
};
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({...form,...selectedCampaign}).unwrap();

      localStorage.setItem("access_token", res.access_token);
      sessionStorage.setItem(
        "vicidial_auth",
        JSON.stringify({
          username: form.username,
          password: form.password,
          ...selectedCampaign
        })
      );
      localStorage.setItem("user", JSON.stringify(res));
      dispatch(setUser(res));
      const defaultPath = res.isAdmin ? "/" : "/call";
      navigate(defaultPath, { replace: true });
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
          <div className="relative campaign-select">
          <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
          <select
         onMouseDown={handleMouseDown}
         onClick={handleClick}
          onBlur={() => setIsSelectOpen(false)}
            disabled={campaingListLoading || campaingList.data.length === 0}
            value={selectedCampaign?.campaign_id ?? ""}
            onChange={(e) => {
              const id = e.target.value;
              const c = campaingList?.data?.find((x) => x.campaign_id === id);
              setSelectedCampaign(c ? { campaign_id: c.campaign_id, campaign_name: c.campaign_name } : null);
            }}
            className="
      w-full
      pl-10 pr-3 py-2
      rounded-lg
      bg-slate-900
      border border-white/10
      text-white
      outline-none
      appearance-none
      focus:ring-2 focus:ring-indigo-500
      disabled:opacity-50
    "
          >
            <option value="" disabled>
              {campaingListLoading ? "Loading campaigns..." : "Select Campaign"}
            </option>

            {campaingList?.data?.map((c) => (
              <option key={c.campaign_id} value={c.campaign_id}>
                {c.campaign_name}
              </option>
            ))}
          </select>
          <ChevronDown
    size={18}
    className={`absolute right-3 top-3 text-slate-400 pointer-events-none transition-transform duration-200 ${
      isSelectOpen ? "rotate-180" : ""
    }`}
  />
          </div>
          <button
            disabled={isLoading || !selectedCampaign}
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
