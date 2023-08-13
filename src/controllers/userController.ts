import { Request, Response } from 'express';
import { User } from '../models/user';
import { StatusCodes } from '../helpers/status-codes';
import { successResponse, errorResponse } from '../helpers/responseHelpers';


export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().populate('hobbies');
		res.status(StatusCodes.OK).send(successResponse(users, 'User data fetched successfully'));
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {

		const newUser = await User.create(req.body);
		res.status(StatusCodes.CREATED).send(successResponse(newUser, 'User Successfully created'));
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId).populate('hobbies');

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
		}

		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
		if (!updatedUser) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
		}

		res.json(updatedUser);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
	}
};


export const deleteUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
		}

		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
	}
};
