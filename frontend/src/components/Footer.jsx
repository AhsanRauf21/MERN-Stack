import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-500 py-10 w-full text-white fixed b-0">
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
