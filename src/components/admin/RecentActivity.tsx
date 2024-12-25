interface Activity {
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

const activities: Activity[] = [
  { action: "Nouveau devis généré", time: "Il y a 2h", status: "success" },
  { action: "Lead qualifié contacté", time: "Il y a 4h", status: "warning" },
  { action: "Installation planifiée", time: "Il y a 6h", status: "info" },
  { action: "Nouveau contact", time: "Il y a 8h", status: "success" },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Activité Récente</h2>
      <div className="space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'success' ? 'bg-green-500' :
                item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>
              <p className="text-sm text-gray-600">{item.action}</p>
            </div>
            <span className="text-sm text-gray-400">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;