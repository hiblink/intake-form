import Image from "next/image";
import { FaTwitter, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile/Tablet: Only logo at top */}
      <div className="md:hidden p-4 bg-white flex justify-center shadow-sm">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={100}  // Reduced from 120
          height={30}  // Reduced from 35
          className="object-contain"
        />
      </div>
      
      {/* Desktop: Full sidebar */}
      <div className="hidden md:flex flex-col justify-between h-full bg-white bg-cover rounded-r-3xl p-6"
           style={{ backgroundImage: "url('/sidebar-bg.jpg')" }}>
        
        {/* Logo - reduced size */}
        <div className="flex justify-start">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={120}  // Reduced from 140
            height={35}  // Reduced from 40
            className="object-contain"
          />
        </div>

        {/* Socials */}
        <div className="flex flex-col space-y-3 text-sm">
          <a href="https://www.facebook.com/profile.php?id=61577414371320" target="_blank" className="text-white hover:text-orange-500 transition-colors">
            <FaFacebook size={30} />  {/* Slightly reduced icon size */}
          </a>
          <a href="https://x.com/HibLink_Tech" target="_blank" className="text-white hover:text-orange-500 transition-colors">
            <FaTwitter size={30} />   {/* Slightly reduced icon size */}
          </a>
          <a href="https://www.linkedin.com/company/hiblinktech/?viewAsMember=true" target="_blank" className="text-white hover:text-orange-500 transition-colors">
            <FaLinkedin size={30} />  {/* Slightly reduced icon size */}
          </a>
          <a href="https://www.tiktok.com/@hiblink_tech" target="_blank" className="text-white hover:text-orange-500 transition-colors">
            <FaTiktok size={30} /> {/* Slightly reduced icon size */}
          </a>
        </div>
      </div>
    </div>
  );
}