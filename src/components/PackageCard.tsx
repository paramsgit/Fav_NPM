import React from "react";

interface PackageProps {
  package: {
    name: string;
    version: string;
    date: string;
    links: {
      npm: string;
    };
    publisher: {
      username: string;
    };
  };
  score: {
    final: number;
  };
}

const PackageCard: React.FC<PackageProps> = ({ package: pkg, score }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        {/* Package Name */}
        <h2 className="text-xl font-bold text-gray-800">
          {pkg.name} <span className="text-sm text-gray-500">v{pkg.version}</span>
        </h2>

        {/* Published Date */}
        <p className="text-gray-600 text-sm mt-2">
          Published on: {new Date(pkg.date).toLocaleDateString()}
        </p>

        {/* Publisher */}
        <p className="text-gray-600 text-sm mt-2">
          Publisher: <span className="font-medium">{pkg.publisher.username}</span>
        </p>

        {/* Final Score */}
        <p className="text-gray-600 text-sm mt-2">
          Score: <span className="font-bold text-blue-600">{score.final.toFixed(2)}</span>
        </p>

        {/* NPM Link */}
        <a
          href={pkg.links.npm}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-blue-500 hover:underline text-sm"
        >
          View on NPM
        </a>
      </div>
    </div>
  );
};

export default PackageCard;
