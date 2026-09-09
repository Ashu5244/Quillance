import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Our Commitment to Transparent Learning",
  description: "Read the terms and conditions for using the Quillance platform and participating in our training and internship programs.",
  alternates: {
    canonical: "/legal/terms-and-conditions",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
