import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schema/signUpSchema";
import z from "zod";

const usernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = { username: searchParams.get("username") };

        const result = usernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const usernameErros = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        usernameErros.length > 0
                            ? usernameErros.join(", ")
                            : "Enter Valid Username",
                },
                {
                    status: 400,
                }
            );
        }

        const { username } = result.data

        const user = await UserModel.findOne({ username, isVerified: true })

        if (user) {
            return Response.json(
                {
                    success: false,
                    message: "Username Already Taken",
                },
                { status: 400 }
            );
        } else {
            return Response.json(
                {
                    success: true,
                    message: "Username Is available",
                },
                { status: 200 }
            );
        }

    } catch (error) {
        console.error("Error Checkin username", error);
        return Response.json(
            {
                success: false,
                message: "Error Checkin username",
            },
            { status: 500 }
        );
    }
}
