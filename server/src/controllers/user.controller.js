import UserModel from "../models/user.model.js";

export const findAll = async (req, res) => {
	try {
		const users = await UserModel.find();
		return res.status(200).json(users);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const create = async (req, res) => { };
export const findOne = async (req, res) => { };
export const update = async (req, res) => { };
export const remove = async (req, res) => { };
export const deleteAll = async (req, res) => { };
