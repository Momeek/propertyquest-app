import { Check } from "lucide-react";

interface PropertyFeaturesProps {
  features?: Record<string, boolean>;
}

function FeatureItem({ label }: { label: string }) {
  return (
    <div className="flex items-center">
      <div className="h-6 w-6 rounded-full bg-[#16a249]/10 p-1 flex items-center justify-center mr-2">
        <Check className="h-3.5 w-3.5 text-[#16a249]" />
      </div>
      <span>{label}</span>
    </div>
  );
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  if (!features || Object.keys(features).length === 0) return null;

  // Filter only true features and format the labels
  const activeFeatures = Object.entries(features)
    .filter(([, value]) => value === true)
    .map(([key]) => ({
      key,
      label: key
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
        .trim(),
    }));

  if (activeFeatures.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Property Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {activeFeatures.map(({ key, label }) => (
          <FeatureItem key={key} label={label} />
        ))}
      </div>
    </div>
  );
}