import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full sm:py-2 bg-base-200 text-neutral-content  px-4 md:px-10 md:py-8 fixed bottom-0 z-50 border-t border-gray-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-1">
        {/* Logo & Copyright */}
        <div className="flex items-center gap-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="text-primary"
          >
            <path d="M12 0L9.8 6H3l5.4 4-2.1 6 5.7-4 5.7 4-2.1-6 5.4-4h-6.8z" />
          </svg>
          <span className="font-semibold">Flirtify  &copy; {new Date().getFullYear()}</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-primary">About</a>
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.9 9.9 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3a9.864 9.864 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149 4.918 4.918 0 0 0 3.195 9.72a4.902 4.902 0 0 1-2.229-.616v.062a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.085 4.936 4.936 0 0 0 4.604 3.419A9.867 9.867 0 0 1 0 21.543a13.952 13.952 0 0 0 7.548 2.212c9.056 0 14.01-7.497 14.01-13.986 0-.213-.005-.426-.014-.637A9.985 9.985 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184C16.011 2.938 7.984 2.939 4.385 3.184.488 3.45.03 5.804 0 12c.03 6.185.485 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.267 4.356-2.631 4.385-8.816-.029-6.196-.484-8.55-4.385-8.816zM9 15.999V8l8 3.999-8 4z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8H6v4h3v12h5V12h4l.5-4h-4.5V6.667C14 5.712 14.192 5.333 15.115 5.333H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
