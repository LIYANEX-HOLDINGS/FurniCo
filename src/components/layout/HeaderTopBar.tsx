import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeaderTopBar() {
  return (
    <div className="w-full border-b border-border-light bg-background hidden md:block">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-[42px] text-sm text-text-muted font-roboto">
        {/* Left Side */}
        <div className="flex items-center">
          <span>
            Only this week <span className="text-primary font-medium hover:underline cursor-pointer">-20%</span>
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link href="#" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4 border-l border-border-light pl-6">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary group">
              <span>English</span>
              <ChevronDown className="w-3 h-3 group-hover:text-primary mt-0.5" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary group">
              <span>$ USD</span>
              <ChevronDown className="w-3 h-3 group-hover:text-primary mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
