import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/utils/sendVerificationemail";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifyByEmail = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingUserVerifyByEmail) {
            return Response.json(
                {
                    success: false,
                    message: "Username Is Already Taken",
                },
                {
                    status: 400,
                }
            );
        }

        const existingUserByEmail = await UserModel.findOne({
            email,
        });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "Email Is Already Taken",
                    },
                    {
                        status: 400,
                    }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
            })
        }

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                {
                    status: 500,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User Register Successfully",
            },
            {
                status: 201,
            }
        );


    } catch (error) {
        console.error("User Register Error", error);
        return Response.json(
            {
                success: false,
                message: "User Register Error",
            },
            {
                status: 500,
            }
        );
    }
}
