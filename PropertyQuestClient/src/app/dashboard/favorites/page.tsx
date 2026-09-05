import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import FavoriteProperties from "@/components/dashboard/favorite-properties";

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Favorites</h1>
        <p className="text-gray-500">{`Properties and searches you've saved`}</p>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="properties">Saved Properties</TabsTrigger>
          {/* <TabsTrigger value="searches">Saved Searches</TabsTrigger> */}
        </TabsList>
        <TabsContent value="properties">
          <FavoriteProperties />
        </TabsContent>
        <TabsContent value="searches">
          <div className="bg-white rounded-lg border p-8 text-center">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Saved Searches Yet</h3>
            <p className="text-gray-500 mb-6">
              Save your search criteria to get notified when new properties
              match your preferences.
            </p>
            <Button>Create a Saved Search</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
