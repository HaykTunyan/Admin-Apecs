"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import LoginView from "@/containers/login";

export default function Home() {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            router.push("/management");
        } else {
            setIsCheckingAuth(false);
        }
    }, []);

    if (isCheckingAuth) {
        return <div className="h-screen min-h-screen"></div>;
    }

    return (
        <div className="h-screen min-h-screen">
            <LoginView/>
        </div>
    );
}
