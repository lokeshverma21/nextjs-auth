import mongoose from "mongoose";

// export async function connect(){
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI!}/nextdb`)

//         const connection = mongoose.connection;

//         connection.on('connected', () => {
//             console.log("MongoDB connected successfully!!")
//         })

//         connection.on('error', (err) => {
//             console.log("MongoDB connection error : "+err)
//             process.exit()
//         })
//     } catch (error) {
//         console.log("Something went wrong!");
//         console.log(error)
//     }
// }






// import mongoose from "mongoose";

export async function connect() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Database already connected");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "nextdb", // Define the database name correctly
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("MongoDB connected successfully!");

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

    } catch (error) {
        console.error("Something went wrong!", error);
        process.exit(1);
    }
}
