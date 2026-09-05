import { Heart, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "save",
    property: "Modern Apartment in Downtown",
    time: "5 hours ago",
    icon: Heart,
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    id: 2,
    type: "expiring",
    property: "Cozy Studio in Historic District",
    time: "Expires in 2 days",
    icon: Clock,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-100",
  },
];

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${activity.bgColor}`}>
            <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium">
              {activity.type === "save" && "Someone saved"}
              {activity.type === "expiring" && "Listing expiring:"}
            </p>
            <p className="text-sm text-gray-500">{activity.property}</p>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
