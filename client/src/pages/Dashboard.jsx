import { useAuth } from "../context/AuthContext";
import SummaryCards from "../components/dashboard/SummaryCards";
import { useTransactions } from "../hooks/useTransactions";

const Dashboard = () => {
  const { user } = useAuth();
  const { summary } = useTransactions();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user?.name} 👋</h1>
      <SummaryCards summary={summary} />
    </div>
  );
};

export default Dashboard;
