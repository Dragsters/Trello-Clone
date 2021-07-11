import mongoose from "mongoose";
const UserModel = mongoose.model("user", mongoose.Schema({
	email: String,
	name: String,
	img_url: String,
	password: String
}
));

export default UserModel;
