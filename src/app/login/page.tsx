"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { useLoginMutation } from "@/redux/api/userAPI";

const Login = () => {
    const router = useRouter();

    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        if (!auth) {
            toast.error("Sign-in is not configured in this environment");
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: "user",
                dob: date,
                _id: user.uid,
            });

            if ("error" in res && res.error) {
                const errorResponse = res.error;
                const message =
                    "data" in errorResponse &&
                    errorResponse.data !== null &&
                    typeof errorResponse.data === "object" &&
                    "message" in errorResponse.data &&
                    typeof errorResponse.data.message === "string"
                        ? errorResponse.data.message
                        : undefined;
                if (message === "Please enter all fields") {
                    toast.error("New Account? Please select Gender and Date of Birth.");
                    return;
                } else {
                    toast.error(message || "Sign in failed");
                    return;
                }
            }

            toast.success(res.data?.message || "Welcome back");
            router.push("/");

        } catch (error) {
            console.error(error);
            toast.error("Sign in failed");
        }
    };

    return (
        <div className="login" suppressHydrationWarning>
            <main>
                <h1 className="heading">Login</h1>
                <div>
                    <label>Gender</label>
                    <select
                        suppressHydrationWarning
                        title="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="dob">Date of birth</label>
                    <input
                        type="date"
                        id="dob"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <p>Already Signed In Once</p>
                    <button suppressHydrationWarning onClick={loginHandler}>
                        <FcGoogle />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
