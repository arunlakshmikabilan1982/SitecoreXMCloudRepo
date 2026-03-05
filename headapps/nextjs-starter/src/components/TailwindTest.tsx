import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-4">Tailwind CSS is Working! 🎉</h2>
      <p className="text-lg mb-6">
        This component demonstrates that Tailwind CSS has been successfully integrated into your
        Sitecore XM Cloud project.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="font-semibold mb-2">Responsive Design</h3>
          <p className="text-sm">Grid layout adapts to screen size</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="font-semibold mb-2">Modern Styling</h3>
          <p className="text-sm">Gradients, shadows, and blur effects</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <h3 className="font-semibold mb-2">Utility Classes</h3>
          <p className="text-sm">Rapid development with utility-first CSS</p>
        </div>
      </div>
      <button className="btn-primary mt-6 hover:scale-105 transform transition-all duration-200">
        Test Button
      </button>
    </div>
  );
};

export default TailwindTest;
