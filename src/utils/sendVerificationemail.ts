import { resend } from "@/lib/resend";
import EchoVerifyEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "Echo <onboarding@resend.dev>",
            to: email,
            subject: "Verify Email | Echo",
            react: EchoVerifyEmail({
                username,
                verificationCode: verifyCode,
            }),
        });

        return { success: true, message: "Verification Email Send Successfully" };
    } catch (error) {
        console.log("Send verify Code Email Error", error);
        return { success: false, message: "Faild to Send verify Code Email" };
    }
}
