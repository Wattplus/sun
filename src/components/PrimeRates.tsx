export const PrimeRates = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.15)_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Barème de la prime à l'autoconsommation
          </h2>
          <p className="text-xl text-blue-200">
            T4 2024 – valable jusqu'au 31/01/2025
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-x-auto">
          <div className="glass-panel p-8 rounded-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-white font-semibold">Puissance de l'installation</th>
                  <th className="py-4 px-4 text-white font-semibold">Montant de la prime</th>
                </tr>
              </thead>
              <tbody className="text-blue-100">
                {[
                  { power: "≤ 3 kWc", amount: "220 € / kWc" },
                  { power: "≤ 9 kWc", amount: "160 € / kWc" },
                  { power: "≤ 36 kWc", amount: "190 € / kWc" },
                  { power: "≤ 100 kWc", amount: "100 € / kWc" },
                  { power: "≤ 500 kWc", amount: "0 € / kWc" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">{row.power}</td>
                    <td className="py-4 px-4">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};