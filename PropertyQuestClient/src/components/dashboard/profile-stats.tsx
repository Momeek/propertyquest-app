import { Card, CardContent } from "@/components/ui/card";
import { Home, Star } from "lucide-react";

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Listings</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reviews</p>
              <h3 className="text-2xl font-bold">
                4.8{" "}
                <span className="text-sm text-gray-500 font-normal">(24)</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
