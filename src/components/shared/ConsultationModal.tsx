"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  User,
  Phone,
  Mail,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Loader2,
  Clock,
  Compass,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const AREA_OF_INTEREST_OPTIONS = [
  "Full Stack Development",
  "Web Development",
  "Cyber security",
  "Gen Al & Agentic Al",
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Data Analytics",
  "Software Testing & Quality Assurance (QA)",
  "Cloud Computing",
  "AutoCAD Mechanical",
  "Hybrid & Electric Vehicles",
  "Construction Planning & Designing",
  "AutoCAD Civil",
  "Internet of Things (loT)",
  "Embedded Systems",
  "Digital Marketing",
  "Finance",
  "Human Resource Management (HR)",
  "Stock market and crypto currency",
  "Product Management",
  "International Business Management",
  "Business Analytics",
];

const YEAR_OF_STUDY_OPTIONS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Graduate",
  "Working Professional",
];

const PREFERRED_TIME_OPTIONS = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
];

const CONSULTATION_MODE_OPTIONS = [
  "Phone Call",
  "Google Meet",
  "WhatsApp Call",
  "Chat Support",
];

export function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    collegeName: "",
    email: "",
    yearOfStudy: "3rd Year",
    areaOfInterest: "Full Stack Development",
    helpDetails: "Career guidance and course recommendation",
    preferredCallTime: "Morning (9 AM – 12 PM)",
    modeOfConsultation: "Phone Call",
  });

  useEffect(() => {
    // Check if user has already dismissed or completed this in current session
    const hasDismissed = sessionStorage.getItem("quillance_consultation_dismissed");
    
    let timer: NodeJS.Timeout;
    if (!hasDismissed) {
      // Auto pop after 3.5 seconds on home page
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
    }

    // Custom Event listener so other buttons can manually trigger the modal
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    window.addEventListener("quillance-open-consultation", handleOpenModal);

    // ESC key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("quillance-open-consultation", handleOpenModal);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("quillance_consultation_dismissed", "true");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    const cleanPhone = formData.phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setIsSubmitted(true);
        sessionStorage.setItem("quillance_consultation_dismissed", "true");
        // Auto-close after 3 seconds on success
        setTimeout(() => {
          setIsOpen(false);
        }, 3200);
      } else {
        setErrorMessage(result.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop with soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl border border-slate-100/80 p-6 sm:p-8 z-10 my-auto overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              /* Success Confirmation View */
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner"
                >
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </motion.div>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-bold text-slate-900">
                    You're all set!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm">
                    Thank you for sharing your details. Our career guidance mentor
                    will reach out to you shortly via WhatsApp / Phone.
                  </p>
                </div>
                <div className="pt-3">
                  <button
                    onClick={closeModal}
                    className="bg-[#0b5cd5] hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form View */
              <div>
                {/* Header Logo */}
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Image
                    src="/Logo/logo-full-trans.webp"
                    alt="Quillance"
                    width={260}
                    height={55}
                    className="h-11 sm:h-12 w-auto object-contain"
                    priority
                  />
                </div>

                {/* Headings */}
                <div className="text-center space-y-1.5 mb-6">
                  <h3 className="text-[20px] sm:text-[23px] font-extrabold text-slate-900 tracking-tight leading-tight">
                    Share your details for{" "}
                    <span className="text-[#0b5cd5] inline-flex items-center">
                      personalised guidance
                    </span>
                    .
                  </h3>
                  <p className="text-[13px] text-slate-500 font-normal leading-relaxed">
                    Our team will connect with you to suggest the most relevant{" "}
                    <span className="font-semibold text-slate-700">program / track</span>.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <span>⚠️ {errorMessage}</span>
                  </div>
                )}

                {/* Main Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-xl border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden">
                      <span className="inline-flex items-center px-3.5 border-r border-slate-200 text-xs font-semibold text-slate-600 bg-slate-100/80">
                        +91
                      </span>
                      <div className="relative flex-1 flex items-center">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                          maxLength={10}
                          placeholder="10 digit mobile number"
                          className="w-full pl-9 pr-4 py-2.5 text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* College Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      College Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        required
                        placeholder="Example: XYZ Institute of Technology"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Email & Year of Study Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Year of Study */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Year of Study <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <select
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleChange}
                          className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none cursor-pointer"
                        >
                          {YEAR_OF_STUDY_OPTIONS.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Area of Interest / Track <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                      <select
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleChange}
                        className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none cursor-pointer"
                      >
                        {AREA_OF_INTEREST_OPTIONS.map((track) => (
                          <option key={track} value={track}>
                            {track}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 pointer-events-none text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Preferred Time & Mode of Consultation Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Preferred Call Time
                      </label>
                      <select
                        name="preferredCallTime"
                        value={formData.preferredCallTime}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none cursor-pointer"
                      >
                        {PREFERRED_TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Mode of Consultation
                      </label>
                      <select
                        name="modeOfConsultation"
                        value={formData.modeOfConsultation}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none cursor-pointer"
                      >
                        {CONSULTATION_MODE_OPTIONS.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-[#00a6f4] hover:bg-[#0092d8] active:scale-[0.99] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-[15px] shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting details...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit details</span>
                      </>
                    )}
                  </button>

                  {/* Disclaimer Text */}
                  <p className="text-[11px] text-center text-slate-400 leading-snug pt-1">
                    By submitting, you consent to be contacted by the Quillance
                    team via WhatsApp / call for counselling purposes.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
