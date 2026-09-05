import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Subscription</h1>
        <p className="text-gray-500">
          Manage your subscription plan and billing
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your subscription details and usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Premium Plan</h3>
                <Badge>Active</Badge>
              </div>
              <p className="text-sm text-gray-500">
                Billed monthly • Renews on Oct 15, 2023
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href="/client/subscription/billing">Billing History</Link>
              </Button>
              <Button variant="outline" className="text-red-600">
                Cancel Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Regular Listings</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-500">of 25 used</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "48%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Featured Listings</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-gray-500">of 5 used</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">New Projects</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-gray-500">of 3 used</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "33%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mt-8">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>10 Regular Listings</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>1 Featured Listing</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Basic Analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Email Support</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                <span className="text-gray-500">New Projects</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                <span className="text-gray-500">Priority Support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Downgrade
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-primary relative">
          <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
            Current
          </div>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>25 Regular Listings</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>5 Featured Listings</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Advanced Analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Priority Email Support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>3 New Projects</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
                <span className="text-gray-500">Phone Support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">$99</span>
              <span className="text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Unlimited Regular Listings</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>15 Featured Listings</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Premium Analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>24/7 Priority Support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Unlimited New Projects</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Dedicated Account Manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Upgrade
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
