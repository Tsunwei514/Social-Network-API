import { Request, Response } from 'express';
import { User } from '../models/Index.js';

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

// Post a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Put to update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updateUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
// Delete to remove a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
