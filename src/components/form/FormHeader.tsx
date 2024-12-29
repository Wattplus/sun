export const FormHeader = () => {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-light to-white animate-gradient">
          Demandez votre étude gratuite
        </h2>
        <p className="text-lg sm:text-xl text-white/90">
          Découvrez votre potentiel d'économies en 2 minutes
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-primary-light/90">
        <span className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full bg-white/5">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Devis gratuit
        </span>
        <span className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full bg-white/5">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Sans engagement
        </span>
      </div>
    </div>
  );
};