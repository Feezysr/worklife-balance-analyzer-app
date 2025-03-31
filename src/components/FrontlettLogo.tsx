
import React from "react";

const FrontlettLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-frontlett to-frontlett-contrast">
        frontlett
      </span>
      <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-frontlett-contrast/10 text-frontlett-contrast">
        Work-Life Balance
      </span>
    </div>
  );
};

export default FrontlettLogo;
