import type { Metadata } from "next";
import MessagesInterface from "@/components/dashboard/messages-interface";
import MobileMessagesInterface from "@/components/dashboard/mobile-messages-interface";

export const metadata: Metadata = {
  title: "Messages | Client Dashboard",
  description: "View and manage your conversations with agents and clients",
};

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Manage your conversations with agents, property owners, and clients.
        </p>
      </div>

      {/* Desktop interface */}
      <div className="hidden md:block">
        <MessagesInterface />
      </div>

      {/* Mobile interface */}
      <div className="md:hidden">
        <MobileMessagesInterface />
      </div>
    </div>
  );
}
