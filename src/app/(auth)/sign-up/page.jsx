"use client";

import { signUp, signIn } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField, }
from "@heroui/react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Basic() {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না");
            return;
        }

        const { data: resdata, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        });

    };

    const handleGoogleSignIn = async () => {
        const resdata = await signIn.social({
            provider: "google"
        });
    };

    const handleGithubSignIn = async () => {
        const resdata = await signIn.social({
            provider: "github"
        });
    };



    const handleSocialLogin = async (provider) => {
        const { data, error } = await signIn.social({
            provider,
            callbackURL: "/",
        });

        if (error) {
            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-[#F1F6F1] px-4 py-7">
            <ToastContainer
                position="top-center"
                autoClose={3000}
            />

            <div className="mx-auto w-full max-w-[418px]">

                <div className="mb-6 text-center">
                    <h1 className="text-[26px] font-bold text-[#202B20]">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-1 text-sm text-[#7A837B]">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <div className="rounded-2xl border border-[#DFE6DF] bg-[#FCFDFC] px-6 py-7">

                    <Form
                        className="flex w-full flex-col gap-4"
                        onSubmit={onSubmit}
                        onInvalidCapture={(e) => {
                            if (e.target.validity?.valueMissing) {
                                e.target.setCustomValidity("এই ঘরটি পূরণ করুন");
                            }
                        }}
                        onInputCapture={(e) => {
                            e.target.setCustomValidity("");
                        }}
                    >
                        <TextField
                            className="flex w-full flex-col gap-1.5"
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-[#202B20] after:!hidden">
                                নাম
                            </Label>

                            <Input
                                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm text-[#202B20] outline-none focus:border-[#008A40]"
                                placeholder="যেমন: রহিম উদ্দিন"
                            />

                            <FieldError className="text-xs text-red-500">
                                {({ validationDetails, validationErrors }) =>
                                    validationDetails.valueMissing
                                        ? "এই ঘরটি পূরণ করুন"
                                        : validationErrors.join(" ")
                                }
                            </FieldError>
                        </TextField>

                        <TextField
                            className="flex w-full flex-col gap-1.5"
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "সঠিক ইমেইল ঠিকানা লিখুন";
                                }

                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-[#202B20] after:!hidden">
                                ইমেইল
                            </Label>

                            <Input
                                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm text-[#202B20] outline-none focus:border-[#008A40]"
                                placeholder="you@example.com"
                            />

                            <FieldError className="text-xs text-red-500">
                                {({ validationDetails, validationErrors }) =>
                                    validationDetails.valueMissing
                                        ? "এই ঘরটি পূরণ করুন"
                                        : validationErrors.join(" ")
                                }
                            </FieldError>
                        </TextField>

                        <TextField
                            className="flex w-full flex-col gap-1.5"
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return "কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
                                }

                                if (!/[0-9]/.test(value)) {
                                    return "কমপক্ষে একটি সংখ্যা থাকতে হবে";
                                }

                                return null;
                            }}
                        >
                            <Label className="text-sm font-semibold text-[#202B20] after:!hidden">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm text-[#202B20] outline-none focus:border-[#008A40]"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                            />

                            <Description className="sr-only">
                                Must be at least 8 characters with 1 uppercase and 1 number
                            </Description>

                            <FieldError className="text-xs text-red-500">
                                {({ validationDetails, validationErrors }) =>
                                    validationDetails.valueMissing
                                        ? "এই ঘরটি পূরণ করুন"
                                        : validationErrors.join(" ")
                                }
                            </FieldError>
                        </TextField>

                        <TextField
                            className="flex w-full flex-col gap-1.5"
                            isRequired
                            name="confirmPassword"
                            type="password"
                        >
                            <Label className="text-sm font-semibold text-[#202B20] after:!hidden">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </Label>

                            <Input
                                className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-3 text-sm text-[#202B20] outline-none focus:border-[#008A40]"
                                placeholder="আবার লিখুন"
                            />

                            <FieldError className="text-xs text-red-500">
                                {({ validationDetails, validationErrors }) =>
                                    validationDetails.valueMissing
                                        ? "পুনরায় পাসওয়ার্ড লিখুন"
                                        : validationErrors.join(" ")
                                }
                            </FieldError>
                        </TextField>

                        <div className="mt-1 flex w-full gap-2">
                            <Button
                                type="submit"
                                className="h-11 w-full rounded-lg bg-[#008D42] font-semibold text-white shadow-md hover:bg-[#007A39]"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </Button>
                        </div>

                    </Form>

                    <div className="my-5 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-[#DFE5DF]"></div>

                        <span className="text-xs text-[#626B63]">
                            অথবা
                        </span>

                        <div className="h-[1px] flex-1 bg-[#DFE5DF]"></div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button
                            onClick={handleGoogleSignIn}
                            className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#263028] whitespace-nowrap gap-2"
                        >
                            <FcGoogle size={17} className="shrink-0" />
                            Google দিয়ে চালিয়ে যান
                        </Button>

                        <Button
                            onClick={handleGithubSignIn}
                            className="h-10 w-full rounded-lg border border-[#DFE7DF] bg-transparent px-2 text-xs font-semibold text-[#263028] whitespace-nowrap gap-2"
                        >
                            <FaGithub size={17} className="shrink-0" />
                            GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>



                    <p className="mt-5 text-center text-sm text-[#263028]">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-[#008D42] hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>

                </div>


                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-[#7B857C] hover:text-[#008D42]"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>


            </div>
        </div>
    );
}
