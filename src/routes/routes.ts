import express from 'express';

import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController';

import {
    getAllHobbies,
    createHobby,
    getHobbyById,
    updateHobby,
    deleteHobby,
} from '../controllers/hobbyController';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/hobbies', getAllHobbies);
router.post('/hobbies', createHobby);
router.get('/hobbies/:id', getHobbyById);
router.put('/hobbies/:id', updateHobby);
router.delete('/hobbies/:id', deleteHobby);


export default router;
