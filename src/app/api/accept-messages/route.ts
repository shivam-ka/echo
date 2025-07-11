import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authorized",
            },
            {
                status: 401,
            }
        );
    }

    const { isAcceptingMessages } = await request.json();

    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            user._id,
            {
                isAcceptingMessages,
            },
            {
                new: true,
            }
        );

        if (!updateUser) {
            return Response.json(
                {
                    success: false,
                    message: "Failed To update user accepting message status",
                },
                {
                    status: 401,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "update user accepting message status",
                updateUser,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: "Failed To update user accepting message status",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authorized",
            },
            {
                status: 401,
            }
        );
    }

    try {
        const foundUser = await UserModel.findById(user._id)
        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User Not Found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessages: foundUser.isAcceptingMessages,
            },
            {
                status: 404,
            }
        );

    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: true,
                message: "Failed To Get user accepting message status",
            },
            {
                status: 500,
            }
        );
    }
}