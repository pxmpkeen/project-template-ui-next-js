"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@shared/config";
import { errors, isLeafMessageKey, useTranslations } from "@shared/lib";
import { Button, Input } from "@shared/ui";
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
    const tError = useTranslations();
    const t = useTranslations("auth");
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors, isSubmitting },
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
        <div className="flex flex-col gap-8 items-center p-8 rounded-xl bg-gray-100 w-120">
            <h1 className="text-xl font-bold">{t("headings.signIn")}</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 max-w-md mx-auto w-full"
            >
                {/* Email */}
                <div>
                    <Input
                        type="email"
                        placeholder={t("inputs.signIn.email.placeholder")}
                        {...register("email")}
                        aria-invalid={!!formErrors.email}
                        aria-describedby={emailId}
                    />
                    {isLeafMessageKey(formErrors.email?.message) && (
                        <p id={emailId}>{tError(formErrors.email.message)}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <Input
                        type="password"
                        placeholder={t("inputs.signIn.password.placeholder")}
                        {...register("password")}
                        aria-invalid={!!formErrors.password}
                        aria-describedby={passwordId}
                    />
                    {isLeafMessageKey(formErrors.password?.message) && (
                        <p id={passwordId}>
                            {tError(formErrors.password.message, {
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
                        {isSubmitting
                            ? t("buttons.signIn.loading")
                            : t("buttons.signIn.default")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
