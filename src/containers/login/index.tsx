"use client";

import InputForm from "@/components/input";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAPI, LoginRequest } from "@/service/authService";
import AllertComponent from "@/components/allertComponent";

interface LoginRequestProps {
  login: string;
  password: string;
}

const LoginView: FC = () => {
  /**
   *  Login View Hooks.
   */

  const router = useRouter();
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAllert, setShowAllert] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onHandleSubmit = (): void => {
    const isEmailValid = validateEmail(emailValue);
    const isPasswordValid = passwordValue.length >= 8;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      handleLogin({
        login: emailValue,
        password: passwordValue,
      });
    } else {
      setShowAllert("error");
    }
  };

  const handleLogin = async ({ login, password }: LoginRequestProps) => {
    setLoading(true);
    const loginData: LoginRequest = { login, password };

    try {
      const response = await loginAPI(loginData);
      // @ts-ignore
      const {
        accessToken,
        refreshToken,
      }: { accessToken: string; refreshToken: string } = response;

      setShowAllert("success");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      router.push("/management");
    } catch (error) {
      // @ts-ignore
      if (error?.status === 400) {
        // @ts-ignore
        // @ts-ignore
        // const messagesForBack = error?.response?.data?.message
        // setErrorMessages(messagesForBack);
        setErrorMessages(
          " We couldn’t find an account with that email or password. Please try again or sign up. "
        );
      } else {
        // @ts-ignore
        setErrorMessages(
          "The email or password you entered is incorrect. Please try again."
        );
      }
      // @ts-ignore
      if (error?.status === 500) {
        setErrorMessages(
          "Oops! Something went wrong.  We’re sorry for the inconvenience."
        );
      }
      setShowAllert("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 h-screen">
      <div className="w-full h-full flex">
        <div className="w-2/5">
          <div className="flex flex-col h-full">
            <div className="mt-52" />
            <div className="flex-grow">
              <div className="w-[360px] mx-auto">
                <div className="">
                  <img src="/icons/Logo.svg" alt="Logo" />
                </div>
                <div className="pt-10" />
                <div className="">
                  <h1 className="text-3.8xl font-black text-default-primary -tracking-wider">
                    Log in
                  </h1>
                  <div className="pt-3" />
                  <div className="text-base font-medium leading-5  text-default-primary">
                    Welcome back! Please enter your details.
                  </div>
                  <div className="pt-8" />
                  <div className="flex flex-col">
                    <div className="">
                      <InputForm
                        type="email"
                        labelTitle="Email"
                        placeholder="Enter your email"
                        value={emailValue}
                        changeValue={setEmailValue}
                        isError={emailError}
                      />
                    </div>
                    <div className="pt-5" />
                    <div className="">
                      <InputForm
                        type="password"
                        labelTitle="Password"
                        placeholder="Enter your password"
                        value={passwordValue}
                        changeValue={setPasswordValue}
                        isError={passwordError}
                      />
                    </div>
                    <div className="pt-6" />
                    <button
                      disabled={loading}
                      className="w-full bg-orange-innter rounded-full py-3 px-3 flex justify-center items-center"
                      onClick={onHandleSubmit}
                    >
                      <span className="text-base text-grey-light-500 font-medium leading-5">
                        {loading ? "Logging in..." : "Sign in"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-52" />
            <div className="mt-auto ">
              <div className="pl-8 pb-5 ">
                <span className="font-medium text-xs leading-4.5 tracking-wider">
                  All Rights Reserved. Apecs – 2024
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5">
          <img
            src="/images/Apecs-Desktop.png"
            alt="Apecs-Desktop"
            className="w-full h-screen"
          />
        </div>
      </div>
      {showAllert === "error" ? (
        <AllertComponent
          type={"error"}
          title="There was a problem with that action"
          description={errorMessages}
          closeAllert={() => setShowAllert("")}
        />
      ) : showAllert === "success" ? (
        <AllertComponent
          type={"success"}
          title="You have successfully logged in"
          description="If you need any assistance, feel free to reach out to our support team."
          closeAllert={() => setShowAllert("")}
        />
      ) : null}
    </div>
  );
};

export default LoginView;
