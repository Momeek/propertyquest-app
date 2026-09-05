"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import SignInForm from "./sign-in-form"
import SignUpForm from "./sign-up-form"

interface AuthModalsProps {
  isSignInOpen: boolean
  isSignUpOpen: boolean
  onSignInOpenChange: (open: boolean) => void
  onSignUpOpenChange: (open: boolean) => void
  onSwitchToSignUp: () => void
  onSwitchToSignIn: () => void
}

export default function AuthModals({
  isSignInOpen,
  isSignUpOpen,
  onSignInOpenChange,
  onSignUpOpenChange,
  onSwitchToSignUp,
  onSwitchToSignIn,
}: AuthModalsProps) {
  return (
    <>
      <Dialog open={isSignInOpen} onOpenChange={onSignInOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>Enter your credentials to access your account</DialogDescription>
          </DialogHeader>
          <SignInForm onSwitchToSignUp={onSwitchToSignUp} />
        </DialogContent>
      </Dialog>

      <Dialog open={isSignUpOpen} onOpenChange={onSignUpOpenChange}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription>Fill in your details to create a new account</DialogDescription>
          </DialogHeader>
          <SignUpForm onSwitchToSignIn={onSwitchToSignIn} />
        </DialogContent>
      </Dialog>
    </>
  )
}
