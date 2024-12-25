export const PrimeRates = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,118,210,0.15)_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center rounded-md bg-blue-400/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 mb-6">
            Aides financières 2024
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Barème de la prime à l'autoconsommation
          </h2>
          <p className="text-xl text-blue-200">
            T4 2024 – valable jusqu'au 31/01/2025
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-x-auto">
          <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-20" />
            <table className="w-full text-left relative z-10">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-white font-semibold">Puissance de l'installation</th>
                  <th className="py-4 px-4 text-white font-semibold">Montant de la prime</th>
                </tr>
              </thead>
              <tbody className="text-blue-100">
                {[
                  { power: "≤ 3 kWc", amount: "220 € / kWc", highlight: true },
                  { power: "≤ 9 kWc", amount: "160 € / kWc", highlight: true },
                  { power: "≤ 36 kWc", amount: "190 € / kWc" },
                  { power: "≤ 100 kWc", amount: "100 € / kWc" },
                  { power: "≤ 500 kWc", amount: "0 € / kWc" },
                ].map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-white/5 transition-colors ${
                      row.highlight 
                        ? 'bg-green-500/10 hover:bg-green-500/20' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="py-4 px-4">{row.power}</td>
                    <td className={`py-4 px-4 ${row.highlight ? 'text-green-400 font-semibold' : ''}`}>
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 text-sm text-blue-200 italic">
              * Ces primes sont cumulables avec les autres aides de l'État
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Jusqu'à 75% d'aides",
                description: "Cumulez toutes les aides disponibles pour maximiser vos économies"
              },
              {
                title: "TVA à 10%",
                description: "Bénéficiez d'une TVA réduite sur l'installation complète"
              },
              {
                title: "Prime garantie",
                description: "Montant fixé par l'État, garanti jusqu'au 31/01/2025"
              }
            ].map((item, index) => (
              <div key={index} className="glass-panel p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};