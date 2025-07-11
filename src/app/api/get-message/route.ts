import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import UserModel from "@/model/User";
import mongoose from "mongoose";

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

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const foundUser = await UserModel.aggregate([
            {
                $match: { _id: userId },
            },
            {
                $unwind: "messages", // unwind array -> give multiple document
            },
            {
                $sort: { "messages.createdAt": -1 },
            },
            {
                $group: {
                    _id: "$_id",
                    message: { $push: "messages" },
                },
            },
        ]);

        if (!foundUser || foundUser.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User Not Fout",
                },
                {
                    status: 404,
                }
            );
        }

         return Response.json(
                {
                    success: true,
                    messages: foundUser[0].messages
                },
                {
                    status: 404,
                }
            );

    } catch (error) {
        console.error(error);
          return Response.json(
                {
                    success: true,
                    messages: "get messages Error"
                },
                {
                    status: 500,
                }
            );

    }
}
