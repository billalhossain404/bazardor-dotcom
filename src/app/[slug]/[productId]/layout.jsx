import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PrivateLayout = async ({ children, params }) => {

    const { slug, productId } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect(`/sign-in?callbackURL=${encodeURIComponent(`/${slug}/${productId}`)}`);
    }
    return children;
};

export default PrivateLayout;
