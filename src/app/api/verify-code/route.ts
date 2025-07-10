import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()

    try {

        const { username, code } = await request.json()

        const user = await UserModel.findOne({ username })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User Not Foud",
                },
                { status: 404 }
            );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeeExpire = new Date(user.verifyCodeExpiry) < new Date()

        if (isCodeValid && !isCodeeExpire) {
            user.isVerified = true
            await user.save();

            return Response.json(
                {
                    success: true,
                    message: "User Verified Successfully",
                },
                { status: 200 }
            );
        } else if (isCodeeExpire) {
            return Response.json(
                {
                    success: false,
                    message: "Verification Code Is Expire",
                },
                { status: 400 }
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Invalid Verify Code",
                },
                { status: 400 }
            );
        }


    } catch (error) {
        console.error("Verify Code Error", error);
        return Response.json(
            {
                success: false,
                message: "Verify Code Error",
            },
            { status: 500 }
        );
    }
}