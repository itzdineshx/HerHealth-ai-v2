
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-herhealth-pink-dark">Her</span>
              <span className="text-xl font-bold text-herhealth-green-dark">Health</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-600 flex items-center">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-herhealth-pink-dark" />
            <span>for women's wellness</span>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} HerHealth. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
