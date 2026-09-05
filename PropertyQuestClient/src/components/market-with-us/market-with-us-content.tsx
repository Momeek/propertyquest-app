"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TermsConditions from "./terms-conditions";
import UserCheckForm from "./user-check-form";
import RegistrationForm from "./registration-form";
import SuccessModal from "./success-modal";
import { useCurrentUserStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import PropertyListingForm from "../dashboard/property-listing-form";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useCookieAuth } from "@/hooks/useCookieAuth";
import Link from "next/link";

export default function MarketWithUsContent() {
  const { terms, isAthenticated, user } = useCurrentUserStore();
  const { cookieToken } = useCookieAuth();
  const { profileData } = useGetProfile({
    userId: user?.userId as string,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  useEffect(() => {
    if (isAthenticated || cookieToken) setIsRegisteredUser(true);
  }, [isAthenticated, cookieToken]);

  const isUserInReview = profileData?.UserDocument?.inReview;
  const isNullOrUndefined =
    profileData?.UserDocument?.inReview === null ||
    profileData?.UserDocument?.inReview === undefined;

  const isUserRejected = profileData?.UserDocument?.rejected;
  const isUserDocRejected = !!isUserInReview && !!isUserRejected;

  return (
    <div className="">
      <div className="text-center mb-12 bg-gray-50 p-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Market Your Properties With Us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Join thousands of successful property marketers on PropertyQuest. List
          your properties and reach millions of potential buyers and renters.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12 mx-auto max-w-6xl py-5 px-6">
        <div>
          <Image
            src="/market.jpg"
            alt="Property Marketing"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Why Market With Us?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-[#16a249] rounded-full p-1 mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Reach Millions</h3>
                <p className="text-gray-600">
                  Connect with millions of potential buyers and renters actively
                  searching for properties.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-[#16a249] rounded-full p-1 mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Powerful Tools</h3>
                <p className="text-gray-600">
                  {`Access advanced marketing tools, analytics, and insights to
                  maximize your listings' performance.`}
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-[#16a249] rounded-full p-1 mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verified Leads</h3>
                <p className="text-gray-600">
                  Receive high-quality, verified leads from serious buyers and
                  renters.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray border border-t">
        {isUserInReview && !isUserRejected && (
          <div className="p-4 bg-yellow-50 text-center border-l-4 border-yellow-400 py-10">
            <p className="font-bold text-2xl text-yellow-600">
              Account Under Review
            </p>
            <p className="text-gray-600">
              Your account is currently under review. You will be notified once
              it is approved.
            </p>
          </div>
        )}

        {!terms ? (
          <div className="mx-auto max-w-6xl rounded-lg p-6">
            <TermsConditions />
          </div>
        ) : (
          <>
            {isRegisteredUser && !isAthenticated && !cookieToken && (
              <div className="mx-auto max-w-6xl rounded-lg p-6">
                <UserCheckForm />
              </div>
            )}
            {!isRegisteredUser && !isAthenticated && !cookieToken && (
              <div className="mx-auto max-w-6xl rounded-lg p-6">
                <RegistrationForm />
              </div>
            )}
            {isRegisteredUser &&
              isAthenticated &&
              cookieToken &&
              (!isUserInReview || isUserDocRejected) && (
                <>
                  <div className="mx-auto max-w-6xl rounded-lg p-6">
                    {isNullOrUndefined && (
                      <div className="space-y-2 text-center mb-6">
                        <h3 className="text-xl font-semibold">
                          Do you already have an account with us?
                        </h3>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                          <Button
                            type="button"
                            variant={isRegisteredUser ? "default" : "outline"}
                            onClick={() => setIsRegisteredUser(true)}
                          >
                            Yes
                          </Button>
                          {!isUserInReview ? (
                            ""
                          ) : (
                            <Button
                              type="button"
                              variant={
                                !isRegisteredUser ? "default" : "outline"
                              }
                              onClick={() => setIsRegisteredUser(false)}
                            >
                              No
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    {!isNullOrUndefined && !isUserInReview && (
                      <>
                        <Link
                          className="underline font-bold mb-4 text-center text-[#16a249] flex justify-center"
                          href={"dashboard/add-property"}
                        >
                          Go to dashboard
                        </Link>
                      </>
                    )}
                    {(isNullOrUndefined || isUserDocRejected) && (
                      <>
                        <PropertyListingForm isUpdate={isUserDocRejected} />
                      </>
                    )}
                  </div>
                </>
              )}
          </>
        )}
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
