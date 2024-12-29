export const FormHeader = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">
        Demandez votre étude gratuite
      </h2>
      <p className="text-lg sm:text-xl text-gray-100">
        Découvrez votre potentiel d'économies en 2 minutes
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-blue-200">
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Devis gratuit
        </span>
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Sans engagement
        </span>
      </div>
    </div>
  );
};