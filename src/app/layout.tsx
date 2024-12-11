import React, {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.scss";
import Head from "next/head";
import ReduxProvider from "@/utils/ReduxProvider";
import Toast from "@/containers/productManagement/toast";

export const metadata: Metadata = {
    title: "Apecs",
    description: "Admin system Apecs",
};

export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
        </Head>
        <body className="font-relative-cy body-scroll">
        <ReduxProvider>
            <Toast/>
            {children}
        </ReduxProvider>
        </body>
        </html>
    );
}
