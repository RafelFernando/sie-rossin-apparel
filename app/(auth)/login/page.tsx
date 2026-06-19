import FormLogin from "@/components/auth/form-login";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

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
            <h1 className="text-lg font-bold text-gray-900 flex justify-center">Rossin Apparel</h1>
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