const SummaryCards = ({ summary }) => {
  const net = (summary.income || 0) - (summary.expense || 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-green-600">Total Income</p>
        <p className="text-4xl font-bold text-green-600 mt-2">
          ₹{(summary.income || 0).toLocaleString("en-IN")}
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-red-600">Total Expense</p>
        <p className="text-4xl font-bold text-red-600 mt-2">
          ₹{(summary.expense || 0).toLocaleString("en-IN")}
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-sm text-indigo-600">Net Balance</p>
        <p
          className={`text-4xl font-bold mt-2 ${
            net >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{net.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
