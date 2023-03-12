import DropdownMenu from "./DropdownMenu";

export default function Header() {
  return (
    <header className="w-full bg-secundary h-10 flex items-center px-1 md:px-8 relative">
      <DropdownMenu />

      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs md:text-sm text-weak">index.js - Visual Yuu Code</span>
      </div>
    </header>
  );
}
