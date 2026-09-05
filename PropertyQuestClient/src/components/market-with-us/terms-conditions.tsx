"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCurrentUserStore } from "@/store/auth.store";

export default function TermsConditions() {
  const { setTerms } = useCurrentUserStore();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      setTerms(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-md p-4 h-80 overflow-y-auto border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          Terms and Conditions for Property Marketers
        </h3>

        <div className="space-y-4 text-sm">
          <div>
            <strong>1. Introduction</strong>
            <p>
              Welcome to PropertyQuest. These Terms and Conditions govern your
              use of our property marketing services. By registering as a
              property marketer on our platform, you agree to comply with these
              terms.
            </p>
          </div>

          <div>
            <strong>2. Eligibility</strong>
            <p>To market properties on our platform, you must be:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>At least 18 years of age</li>
              <li>
                A licensed real estate agent, broker, property manager,
                developer, or property owner
              </li>
              <li>Authorized to list and market the properties you submit</li>
              <li>
                In compliance with all applicable real estate laws and
                regulations
              </li>
            </ul>
          </div>

          <div>
            <strong>3. Account Registration</strong>
            <p>
              You must provide accurate and complete information during
              registration. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>
          </div>

          <div>
            <strong>4. Property Listings</strong>
            <p>All property listings must:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Contain accurate and truthful information</li>
              <li>Include only properties you are authorized to market</li>
              <li>
                Comply with fair housing laws and anti-discrimination
                regulations
              </li>
              <li>
                Not infringe on any third-party intellectual property rights
              </li>
              <li>Include clear and accurate images of the property</li>
            </ul>
          </div>

          <div>
            <strong>5. Fees and Payments</strong>
            <p>
              Our fee structure is outlined in our pricing page. We reserve the
              right to modify our fees with reasonable notice. All fees are
              non-refundable unless otherwise specified.
            </p>
          </div>

          <div>
            <strong>6. Prohibited Activities</strong>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Post fraudulent or misleading property listings</li>
              <li>
                Engage in any activity that violates applicable laws or
                regulations
              </li>
              <li>{`Manipulate or interfere with our platform's functionality`}</li>
              <li>Harvest or collect user information without consent</li>
              <li>Use our platform to send unsolicited communications</li>
            </ul>
          </div>

          <div>
            <strong>7. Content Ownership</strong>
            <p>
              You retain ownership of the content you submit, but grant us a
              non-exclusive, worldwide, royalty-free license to use, reproduce,
              modify, and display the content for the purpose of operating and
              promoting our platform.
            </p>
          </div>

          <div>
            <strong>8. Termination</strong>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these terms or engage in fraudulent or illegal activities.
              You may terminate your account at any time by contacting our
              support team.
            </p>
          </div>

          <div>
            <strong>9. Limitation of Liability</strong>
            <p>
              To the maximum extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or relating to your use of our platform.
            </p>
          </div>

          <div>
            <strong>10. Changes to Terms</strong>
            <p>
              We may modify these terms at any time. Continued use of our
              platform after such modifications constitutes your acceptance of
              the revised terms.
            </p>
          </div>

          <div>
            <strong>11. Governing Law</strong>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of [Jurisdiction], without regard to its conflict of law
              provisions.
            </p>
          </div>

          <div>
            <strong>12. Contact Information</strong>
            <p>
              If you have any questions about these terms, please contact us at
              support@propertyquest.com.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={(checked) => setAccepted(checked === true)}
        />
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and agree to the terms and conditions
        </Label>
      </div>

      <Button
        className="w-full bg-[#16a249] hover:bg-[#0d7a33]"
        disabled={!accepted}
        onClick={handleAccept}
      >
        Accept Terms & Continue
      </Button>
    </div>
  );
}
