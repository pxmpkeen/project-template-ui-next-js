"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@shared/config";
import { errors } from "@shared/lib";
import { Button, Input } from "@shared/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const emailId = "email-error";
const passwordId = "password-error";
const passwordMinLength = 6;
const passwordMaxLength = 12;
const SignInSchema = z.object({
    email: z.email(errors.INVALID_EMAIL).min(1, errors.REQUIRED_EMAIL),
    password: z
        .string()
        .min(passwordMinLength, errors.PASSWORD_MIN_LENGTH)
        .max(passwordMaxLength, errors.PASSWORD_MAX_LENGTH),
});

type SignInFormValues = z.infer<typeof SignInSchema>;

export default function SignInPage() {
    const t = useTranslations("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(SignInSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    useEffect(() => useAuthStore.getState().finishRedirect(), []);

    const onSubmit = (data: SignInFormValues) => {
        console.log("Sign in data:", data);
        useAuthStore.getState().reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md mx-auto"
        >
            {/* Email */}
            <div>
                <Input
                    placeholder="Enter your email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={emailId}
                />
                {errors.email?.message && (
                    <p id={emailId}>{t(errors.email.message)}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                    aria-describedby={passwordId}
                />
                {errors.password?.message && (
                    <p id={passwordId}>
                        {t(errors.password.message, {
                            min: passwordMinLength,
                            max: passwordMaxLength,
                        })}
                    </p>
                )}
            </div>

            {/* Submit */}
            <div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
            </div>
        </form>
    );
}
