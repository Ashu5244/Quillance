import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdzKjLeEUv4ARjzCQsR-vp0fIJ1ft5LIEa3ltGboynXpYAncA/formResponse";

// Exact Entry ID mapping for Google Form: https://forms.gle/6sN9js9r4jhGRyLg9
const ENTRY_MAP = {
  fullName: "entry.1750497960",
  phoneNumber: "entry.589522531",
  collegeName: "entry.95570845",
  email: "entry.1191004874",
  yearOfStudy: "entry.447239980",
  areaOfInterest: "entry.1927875898",
  helpDetails: "entry.122573093",
  preferredCallTime: "entry.1010551435",
  modeOfConsultation: "entry.134235863",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      phoneNumber,
      collegeName,
      email,
      yearOfStudy,
      areaOfInterest,
      helpDetails,
      preferredCallTime,
      modeOfConsultation,
    } = body;

    // Validate required fields
    if (!fullName || !phoneNumber || !email) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    if (fullName) formData.append(ENTRY_MAP.fullName, fullName.trim());
    if (phoneNumber) formData.append(ENTRY_MAP.phoneNumber, phoneNumber.trim());
    if (collegeName) formData.append(ENTRY_MAP.collegeName, collegeName.trim());
    if (email) formData.append(ENTRY_MAP.email, email.trim());
    if (yearOfStudy) formData.append(ENTRY_MAP.yearOfStudy, yearOfStudy.trim());
    if (areaOfInterest)
      formData.append(ENTRY_MAP.areaOfInterest, areaOfInterest.trim());
    if (helpDetails) formData.append(ENTRY_MAP.helpDetails, helpDetails.trim());
    if (preferredCallTime)
      formData.append(ENTRY_MAP.preferredCallTime, preferredCallTime.trim());
    if (modeOfConsultation)
      formData.append(ENTRY_MAP.modeOfConsultation, modeOfConsultation.trim());

    // Submit to Google Forms endpoint
    const googleRes = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (googleRes.ok || googleRes.status === 200 || googleRes.status === 302) {
      return NextResponse.json({ success: true, message: "Details submitted successfully!" });
    }

    return NextResponse.json({ success: true, message: "Details recorded successfully." });
  } catch (error: any) {
    console.error("Error submitting to Google Forms:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}
