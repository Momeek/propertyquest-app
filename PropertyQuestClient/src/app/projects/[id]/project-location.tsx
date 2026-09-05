// import Image from "next/image";
import {
  MapPin,
  Building,
  School,
  Train,
  ShoppingBag,
  Utensils,
} from "lucide-react";

interface ProjectLocationProps {
  location: string;
}

export default function ProjectLocation({ location }: ProjectLocationProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Location</h3>

      <div className="flex items-start gap-2 mb-4">
        <MapPin className="h-5 w-5 text-[#16a249] mt-0.5" />
        <div>
          <p className="font-medium">{location}</p>
          <p className="text-sm text-gray-500">
            Explore this neighborhood to discover nearby amenities, schools, and
            transportation options.
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-[300px] rounded-lg overflow-hidden border mb-6">
        {/* <Image src="" alt="Map location" fill className="object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-lg">
            <p className="font-medium">Map view coming soon</p>
          </div>
        </div>
      </div>

      <h4 className="font-medium mb-3">Nearby Amenities</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Building className="h-5 w-5 text-primary mr-2" />
          <div>
            <p className="font-medium">Business District</p>
            <p className="text-sm text-gray-500">5 minutes drive</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <School className="h-5 w-5 text-primary mr-2" />
          <div>
            <p className="font-medium">International Schools</p>
            <p className="text-sm text-gray-500">10 minutes drive</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Train className="h-5 w-5 text-primary mr-2" />
          <div>
            <p className="font-medium">Metro Station</p>
            <p className="text-sm text-gray-500">8 minutes walk</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <ShoppingBag className="h-5 w-5 text-primary mr-2" />
          <div>
            <p className="font-medium">Shopping Mall</p>
            <p className="text-sm text-gray-500">12 minutes drive</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Utensils className="h-5 w-5 text-primary mr-2" />
          <div>
            <p className="font-medium">Restaurants & Cafes</p>
            <p className="text-sm text-gray-500">5 minutes walk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
