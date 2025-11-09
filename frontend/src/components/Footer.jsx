import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-500 py-10 text-white fixed mb-0">
      {/* Bottom bar */}
      <div className="bg-indigo-600  text-center text-sm text-indigo-200">
        <p>
          &copy; <span className="font-bold">{new Date().getFullYear()}</span> Task Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
