import dbConnect from "@/lib/dbConnect"
import UserModel, { Message } from "@/model/User"

export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()
    try {

        const user = await UserModel.findOne({ username })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not Fount"
                },
                {
                    status: 404
                }
            )
        }

        if (!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: "User is not Accepting message"
                },
                {
                    status: 404
                }
            )
        }

        const newMessage = {
            content,
            createdAt: new Date()
        }

        user.messages.push(newMessage as Message)
        await user.save();

        return Response.json(
            {
                success: true,
                message: "Message Send Successfully"
            },
            {
                status: 404
            }
        )


    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: true,
                messages: "Send Message Error"
            },
            {
                status: 500,
            }
        );

    }
}