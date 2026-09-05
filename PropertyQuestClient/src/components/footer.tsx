import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
// import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1f36] text-white">
      <div className="container py-12 md:py-16 px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About PropertyQuest</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  New Developments
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  International Properties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Real Estate News
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Download our app</h4>
              <div className="flex space-x-2">
                <Link href="#">
                  {/* <Image
                    src=""
                    height={0}
                    width={0}
                    alt="App Store"
                    className="h-10"
                  /> */}
                </Link>
                <Link href="#">
                  {/* <Image
                    src=""
                    height={0}
                    width={0}
                    alt="Google Play"
                    className="h-10"
                  /> */}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} PropertyQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
