import { Request, Response } from 'express';
import { Hobby } from '../models/hobby';
import { StatusCodes } from './../helpers/status-codes';

export const getAllHobbies = async (req: Request, res: Response) => {
  try {
    const hobbies = await Hobby.find();
    console.log("Hobbiess ========", hobbies)
    res.status(StatusCodes.OK).json(hobbies);
  } catch (error) {
    console.log("ERROR=========", error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  }
};


export const createHobby = async (req: Request, res: Response) => {
  try {
    // const { error } = hobbySchema.validate(req.body);
    // if (error) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
    // }

    const newHobby = await Hobby.create(req.body);
    res.status(StatusCodes.CREATED).json(newHobby);
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
    //   const { error } = hobbySchema.validate(req.body);
    //   if (error) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
    //   }

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
