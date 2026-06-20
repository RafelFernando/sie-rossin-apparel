import FormLogin from "@/components/auth/form-login";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image";

export default async function Login({ searchParams }: {
    searchParams?: Promise<{ error?: string }>
}) {
    const session = await auth()
    if (session) {
        redirect("/dashboard")
    }

    const params = (await searchParams)?.error

    return (
        <div className="p-6 space-y-4 bg-white w-[400px]">
            <div className="flex justify-center mb-0">
                <Image src="/logo.png" alt="Rossin Apparel" width={150} height={150} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 flex justify-center">Sign in to your account</h1>

            {params === "OAuthAccountNotLinked" && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
                    <span className="font-medium">Account already use by other provider</span>
                </div>
            )}

            <FormLogin />
        </div>
    )
}