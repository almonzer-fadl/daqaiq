import Image from "next/image";
//import logoImg from "@/public/logo.png";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="navbar bg-base-0 fixed top-0 left-0 right-0 z-[1000]">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden bg-#E88213">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-45 p-2 shadow">
        <li><a href="#">الرئيسية</a></li>
        <li><a>من نحن</a></li>
        <li>
          <a>خدماتنا</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>الأسعار</a></li>
        <li><a>موقعنا</a></li>
        <li><a>تواصل معنا</a></li>
        <li><a>الأسئلة الشائعة</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><a>الأسئلة الشائعة</a></li>
        <li><a>تواصل معنا</a></li>
        <li><a>موقعنا</a></li>
        <li><a>الأسعار</a></li>
        <li>
          <a>خدماتنا</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>من نحن</a></li>
        <li><a href="#">الرئيسية</a></li>
      </ul>
      </div>

          <div className="navbar-end">
          <a className="ml-2">
             <Image src= {"/public"} alt="Logo" width={200} height={200} />
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}