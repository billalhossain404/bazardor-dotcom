"use client";

import { updateUser, useSession, signOut } from "@/lib/auth-client";
import { Button, FieldError, FieldGroup, Fieldset, Form, Input, Label, TextField } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {

    const { data: session, isPending, refetch } = useSession();
    const router = useRouter();

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { error } = await updateUser({
            name: userData.name
        });

        if (error) {
            toast.error('আপডেট হয়নি!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else {
            await refetch();
            toast.success('নাম আপডেট হয়েছে!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };
    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    };

    if (isPending) return <p>Loading...</p>;
    if (!session?.user) return <p>প্রথমে লগইন করুন।</p>;

    const user = session.user;

    return (
        <div className="bg-[#F2F7F3] min-h-screen p-4 sm:p-8">
            <ToastContainer />

            <div className="max-w-4xl mx-auto">

                <h2 className="text-2xl font-bold">আমার প্রোফাইল</h2>
                <p className="text-gray-500 mb-6"> আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন। </p>

                <div className="bg-white rounded-2xl border p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    {user.image ? (
                        <Image
                            src={user.image}
                            width={75}
                            height={75}
                            unoptimized
                            alt="Profile"
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="w-[75px] h-[75px] bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                            {user.name?.charAt(0)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold">{user.name}</h2>

                        <p className="text-gray-500 break-all"> {user.email}</p>
                    </div>
                    <Button
                        onPress={handleSignOut}
                        className="border border-red-500 text-red-500 bg-white rounded-lg px-5 py-2 font-medium hover:bg-red-50 cursor-pointer">
                        সাইন আউট
                    </Button>
                </div>
                <div className="bg-white rounded-2xl border p-6">

                    <Form
                        className="w-full"
                        onSubmit={handleUpdateUser}
                    >
                        <Fieldset className="w-full">

                            <Fieldset.Legend className="text-xl font-semibold">
                                তথ্য
                            </Fieldset.Legend>

                            <FieldGroup className="px-5">
                                <TextField
                                    name="name"
                                    defaultValue={user.name}
                                    key={user.id + user.name}
                                    validate={(value) => {
                                        if (value.trim().length < 3) {
                                            return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                                        }
                                        return null;
                                    }}>
                                    <Label className="mt-3">নাম</Label>
                                    <Input
                                        required
                                        placeholder="আপনার নাম লিখুন"
                                        className="rounded-[5px]"
                                    />
                                    <FieldError />
                                </TextField>
                            </FieldGroup>
                            <Fieldset.Actions className="w-full px-5">

                                <Button
                                    type="submit"
                                    className="w-full rounded-[5px] bg-[#05893E] text-white" >

                                    আপডেট
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </div>
            </div>
        </div>
    );
}