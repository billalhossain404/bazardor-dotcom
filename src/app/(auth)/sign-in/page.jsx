"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";

export default function Basic() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setLoading(true);
        setErrorMessage("");

        const requested = new URLSearchParams(window.location.search).get("callbackURL");

        const callbackURL =
            requested?.startsWith("/") && !requested.startsWith("//")
                ? requested
                : "/";

        try {
            const { data: resdata, error } = await signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: callbackURL,
            });

            if (error) {
                setErrorMessage(error.message);
                return;
            }

        } catch (error) {
            setErrorMessage("সাইন ইন করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    const socialLogin = async (provider) => {
        setErrorMessage("");

        try {
            const { error } = await signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(error.message);
            }
        } catch (error) {
            setErrorMessage("সাইন ইন করতে সমস্যা হয়েছে।");
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f6f2] flex flex-col items-center px-4 py-7">

            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-[26px] font-bold text-[#202b23]">
                    সাইন ইন
                </h1>

                <p className="text-[14px] text-[#788079] mt-1">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-[450px] bg-white/80 border border-[#dce6dd] rounded-2xl px-6 py-6">

                <Form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={onSubmit}
                >

                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "অনুগ্রহ করে সঠিক ইমেইল লিখুন";
                            }

                            return null;
                        }}
                    >
                        <Label className="text-[14px] font-semibold text-[#28362d] mb-1.5">
                            ইমেইল
                        </Label>

                        <Input
                            placeholder="you@example.com"
                            className="w-full h-10 px-3 rounded-lg border border-[#dce5de] bg-[#fafcfb] outline-none focus:border-green-600"
                        />

                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        className="w-full"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের ইংরেজি অক্ষর থাকতে হবে";
                            }

                            if (!/[0-9]/.test(value)) {
                                return "পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে";
                            }

                            return null;
                        }}
                    >
                        <Label className="text-[14px] font-semibold text-[#28362d] mb-1.5">
                            পাসওয়ার্ড
                        </Label>

                        <Input
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full h-10 px-3 rounded-lg border border-[#dce5de] bg-[#fafcfb] outline-none focus:border-green-600"
                        />

                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center">
                            {errorMessage}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full h-10 bg-[#008a3b] hover:bg-[#007631] text-white font-semibold rounded-lg shadow-md transition-all"
                    >
                        {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                    </Button>

                </Form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-[#dce5de]"></div>

                    <span className="text-sm text-[#535e55]">
                        অথবা
                    </span>

                    <div className="flex-1 h-px bg-[#dce5de]"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                    {/* Google Login */}
                    <Button
                        type="button"
                        onPress={() => socialLogin("google")}
                        className="w-full h-10 flex items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white hover:bg-gray-50 text-[#253028] text-[12px] sm:text-[13px] font-semibold"
                    >
                        <svg width="17" height="17" viewBox="0 0 48 48" className="shrink-0">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.75 7.18l7.73 6C44.43 38.03 46.98 31.87 46.98 24.55z" />
                            <path fill="#FBBC05" d="M10.53 28.59A14.41 14.41 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.87 23.87 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>

                        Google দিয়ে চালিয়ে যান
                    </Button>

                    {/* GitHub Login */}
                    <Button
                        type="button"
                        onPress={() => socialLogin("github")}
                        className="w-full h-10 flex items-center justify-center gap-2 rounded-lg border border-[#dce5de] bg-white hover:bg-gray-50 text-[#253028] text-[12px] sm:text-[13px] font-semibold"
                    >
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="shrink-0"
                        >
                            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.16 1.18A11 11 0 0 1 12 6.43c.98 0 1.97.13 2.9.39 2.2-1.49 3.16-1.18 3.16-1.18.62 1.6.23 2.78.11 3.07.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.7.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                        </svg>

                        GitHub দিয়ে চালিয়ে যান
                    </Button>

                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-[#475449] mt-4">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/sign-up"
                        className="text-[#008a3b] font-semibold hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>

            </div>

            {/* Back Home */}
            <Link
                href="/"
                className="mt-6 text-sm text-[#778279] hover:text-[#008a3b] transition"
            >
                ← হোম পেজে ফিরে যান
            </Link>

        </div>
    );
}
