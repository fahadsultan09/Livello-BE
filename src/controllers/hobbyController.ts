import { Request, Response } from 'express';
import { Hobby } from '../models/hobby';
import { User } from '../models/user';

import { StatusCodes } from './../helpers/status-codes';
import { successResponse } from '../helpers/responseHelpers';

export const getAllHobbies = async (req: Request, res: Response) => {
  try {
    const hobbies = await Hobby.find();
    res.status(StatusCodes.OK).json(hobbies);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};


export const createHobby = async (req: Request, res: Response) => {
  try {

    const newHobby = await Hobby.create(req.body);
    res.status(StatusCodes.CREATED).send(successResponse(newHobby, 'Hobby Successfully created'));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export const createHobbyOnUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      name: req.body.name,
      passionLevel: req.body.passionLevel,
      year: req.body.year
    }

    const userID = req.body.userID;
    const newHobby = await Hobby.create(payload);

    const userToUpdate = await User.findById(userID);
    if (!userToUpdate) {
      console.error('User not found');
      return;
    }

    userToUpdate.hobbies.push(newHobby._id);
    const updatedUser = await userToUpdate.save();

    console.log("***** hobbyController::createHobbyOnUser ****", newHobby, updatedUser)
    res.status(StatusCodes.CREATED).send(successResponse(newHobby, 'Hobby Successfully created'));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};



export const getHobbyById = async (req: Request, res: Response) => {
  try {
    const hobbyID = req.params.id;
    const hobby = await Hobby.findById(hobbyID).populate('hobbies');

    if (!hobby) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Hobby not found' });
    }

    res.json(hobby);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};

export const updateHobby = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser = await Hobby.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Hobby not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};


export const deleteHobby = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Hobby.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Hobby not found' });
    }

    res.json({ message: 'Hobby deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};
