import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("databse already connected");
        return;
    }

    try {
        const db = await mongoose.connect(
            `${process.env.MONGODB_URI}/echo` || "",
            {}
        );

        connection.isConnected = db.connections[0].readyState;
        console.log("Dd Connect Successfully")
    } catch (error) {
        console.log("Dd Connect faild!!", error);
        process.exit(1)
    }
}

export default dbConnect;