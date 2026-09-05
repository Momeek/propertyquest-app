"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotificationSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    propertyInquiries: true,
    newMessages: true,
    accountUpdates: true,
    marketingEmails: false,
    listingUpdates: true,
    savedSearchAlerts: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    propertyInquiries: true,
    newMessages: true,
    accountUpdates: false,
    listingUpdates: false,
    savedSearchAlerts: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Manage the emails you receive from us
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Property Inquiries</p>
                <p className="text-sm text-gray-500">
                  Receive emails when someone inquires about your property
                </p>
              </div>
              <Switch
                checked={emailNotifications.propertyInquiries}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    propertyInquiries: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Messages</p>
                <p className="text-sm text-gray-500">
                  Receive emails for new messages from clients or agents
                </p>
              </div>
              <Switch
                checked={emailNotifications.newMessages}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    newMessages: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Updates</p>
                <p className="text-sm text-gray-500">
                  Receive emails about your account activity and security
                </p>
              </div>
              <Switch
                checked={emailNotifications.accountUpdates}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    accountUpdates: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-gray-500">
                  Receive promotional emails and special offers
                </p>
              </div>
              <Switch
                checked={emailNotifications.marketingEmails}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    marketingEmails: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Listing Updates</p>
                <p className="text-sm text-gray-500">
                  Receive emails about your listing performance and status
                </p>
              </div>
              <Switch
                checked={emailNotifications.listingUpdates}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    listingUpdates: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Saved Search Alerts</p>
                <p className="text-sm text-gray-500">
                  Receive emails when new properties match your saved searches
                </p>
              </div>
              <Switch
                checked={emailNotifications.savedSearchAlerts}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    savedSearchAlerts: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>
              Manage notifications on your devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Property Inquiries</p>
                <p className="text-sm text-gray-500">
                  Receive notifications when someone inquires about your
                  property
                </p>
              </div>
              <Switch
                checked={pushNotifications.propertyInquiries}
                onCheckedChange={(checked) =>
                  setPushNotifications({
                    ...pushNotifications,
                    propertyInquiries: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Messages</p>
                <p className="text-sm text-gray-500">
                  Receive notifications for new messages from clients or agents
                </p>
              </div>
              <Switch
                checked={pushNotifications.newMessages}
                onCheckedChange={(checked) =>
                  setPushNotifications({
                    ...pushNotifications,
                    newMessages: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Updates</p>
                <p className="text-sm text-gray-500">
                  Receive notifications about your account activity and security
                </p>
              </div>
              <Switch
                checked={pushNotifications.accountUpdates}
                onCheckedChange={(checked) =>
                  setPushNotifications({
                    ...pushNotifications,
                    accountUpdates: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Listing Updates</p>
                <p className="text-sm text-gray-500">
                  Receive notifications about your listing performance and
                  status
                </p>
              </div>
              <Switch
                checked={pushNotifications.listingUpdates}
                onCheckedChange={(checked) =>
                  setPushNotifications({
                    ...pushNotifications,
                    listingUpdates: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Saved Search Alerts</p>
                <p className="text-sm text-gray-500">
                  Receive notifications when new properties match your saved
                  searches
                </p>
              </div>
              <Switch
                checked={pushNotifications.savedSearchAlerts}
                onCheckedChange={(checked) =>
                  setPushNotifications({
                    ...pushNotifications,
                    savedSearchAlerts: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end gap-2 px-0">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Preferences"}
          </Button>
        </CardFooter>
      </div>
    </form>
  );
}
