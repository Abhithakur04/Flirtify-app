import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 text-neutral-content py-6 px-4 md:px-10 fixed bottom-0 z-50 border-t border-gray-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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





// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className="footer text-neutral-content items-center p-4 bg-base-200 fixed bottom-0">
//   <aside className="grid-flow-col items-center">
//     <svg
//       width="36"
//       height="36"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//       fillRule="evenodd"
//       clipRule="evenodd"
//       className="fill-current">
//       <path
//         d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
//     </svg>
//     <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
//   </aside>
//   <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
//     <a>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         className="fill-current">
//         <path
//           d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//       </svg>
//     </a>
//     <a>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         className="fill-current">
//         <path
//           d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//       </svg>
//     </a>
//     <a>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         className="fill-current">
//         <path
//           d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//       </svg>
//     </a>
//   </nav>
// </footer>
//   )
// }

// export default Footer
