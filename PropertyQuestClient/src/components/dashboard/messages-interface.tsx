"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Phone, Video, MoreVertical, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hi, I'm interested in your property on Oak Street.",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When can I schedule a viewing?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the information!",
    timestamp: "Monday",
    unread: false,
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Is the property still available?",
    timestamp: "Sunday",
    unread: false,
  },
];

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    senderId: "2", // Michael Chen
    text: "Hi, I'm interested in the 3-bedroom apartment you listed.",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    senderId: "current-user",
    text: "Hello! Yes, it's still available. Would you like to schedule a viewing?",
    timestamp: "10:05 AM",
  },
  {
    id: "3",
    senderId: "2",
    text: "That would be great. Is tomorrow afternoon possible?",
    timestamp: "10:10 AM",
  },
  {
    id: "4",
    senderId: "current-user",
    text: "Yes, I can do tomorrow at 2 PM. Does that work for you?",
    timestamp: "10:15 AM",
  },
  {
    id: "5",
    senderId: "2",
    text: "Perfect! I'll see you then. Can you send me the exact address?",
    timestamp: "10:20 AM",
  },
];

export default function MessagesInterface() {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  return (
    <div className="border rounded-lg bg-white overflow-hidden h-[calc(100vh-220px)] flex">
      {/* Conversations sidebar */}
      <div className="w-full max-w-xs border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search conversations" className="pl-9" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors",
                activeConversation.id === conversation.id && "bg-gray-100"
              )}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="relative">
                <Image
                  src={conversation.avatar || "/placeholder.svg"}
                  alt={conversation.name}
                  className="h-10 w-10 rounded-full object-cover"
                  width={40}
                  height={40}
                  priority
                />
                {conversation.unread && (
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium truncate">{conversation.name}</h4>
                  <span className="text-xs text-gray-500">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={activeConversation.avatar || "/placeholder.svg"}
              alt={activeConversation.name}
              className="h-10 w-10 rounded-full object-cover"
              width={40}
              height={40}
              priority
            />
            <div>
              <h3 className="font-medium">{activeConversation.name}</h3>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === "current-user";

            return (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                <div className="flex items-end gap-2 max-w-[80%]">
                  {!isCurrentUser && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        isCurrentUser
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      )}
                    >
                      <p>{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
