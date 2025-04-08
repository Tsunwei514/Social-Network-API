import { Request, Response } from 'express';
import User from '../models/User.js';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// Get a single user by ID

// Post a new user

// Put to update a user by ID

// Delete to remove a user by ID

// Add a friend to a user's friend list

// Remove a friend from a user's friend list