// import Image from "next/image";
import { PropertyAttr } from "@/interfaces/property.interface";
import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  location: PropertyAttr["location"];
}

export default function PropertyLocation({ location }: PropertyLocationProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Location</h3>

      <div className="flex items-start gap-2 mb-4">
        <MapPin className="h-5 w-5 text-[#16a249] mt-0.5" />
        <div>
          <p className="font-medium">
            {location?.city}, {location?.neighborhood}
          </p>
          <p className="text-sm text-gray-500">
            {location?.state} {location?.zipCode}
          </p>
        </div>
      </div>

      {/* TODO: Map Placeholder */}
      {/* <div className="relative h-[300px] rounded-lg overflow-hidden border">
        <Image src="/" alt="Map location" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-3 rounded-lg shadow-lg">
            <p className="font-medium">Map view coming soon</p>
          </div>
        </div>
      </div> */}

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {location?.nearbyPlaces?.school && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Schools</p>
            <p className="text-lg font-bold">{location.nearbyPlaces.school}</p>
            <p className="text-xs text-gray-500">Nearby Schools</p>
          </div>
        )}
        {location?.nearbyPlaces?.shopping && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Shopping</p>
            <p className="text-lg font-bold">
              {location.nearbyPlaces.shopping}
            </p>
            <p className="text-xs text-gray-500">Nearby Shopping Centers</p>
          </div>
        )}
        {location?.nearbyPlaces?.park && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Parks</p>
            <p className="text-lg font-bold">{location.nearbyPlaces.park}</p>
            <p className="text-xs text-gray-500">Nearby Parks</p>
          </div>
        )}
        {location?.nearbyPlaces?.transportation && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Public Transport</p>
            <p className="text-lg font-bold">
              {location.nearbyPlaces.transportation}
            </p>
            <p className="text-xs text-gray-500">Nearby Transport Options</p>
          </div>
        )}
      </div>
    </div>
  );
}
