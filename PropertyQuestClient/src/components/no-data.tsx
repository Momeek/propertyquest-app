// components/NoData.tsx
import React from "react";

export default function NoData({ message = "No properties found." }) {
  return (
    <div className="col-span-full text-center py-12 text-gray-500">
      {message}
    </div>
  );
}
