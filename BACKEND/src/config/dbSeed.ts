import User from "../models/User.js";
import bcrypt from "bcrypt";

const seedDB = async () => {
    try {
        const users = await User.find({ roles: "Admin" });
        if (users.length === 0) {
            const defaultUser = new User({
                username: "Admin",
                password: await bcrypt.hash("Pa$$w0rd", 10),
                roles: ["Admin", "Manager", "Employee"],
                active: true
            });
            await defaultUser.save();
            console.log("Default admin user created");
        }
    } catch (error) {
        console.log("Error creating default user", error);
    }
}

export default seedDB;