import { Request, Response } from 'express';
import { Thought, User } from '../models/Index.js';

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Post to create a new thought with a user ID
export const createThought = async (req: Request, res: Response) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Put to update a thought by ID
export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Delete to remove a thought by ID
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        res.json(deletedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Post to create a reaction stored in a single thought's reactions array field
export const addReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;

        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $push: { reactions: req.body },
            },
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            res.status(404).json({ message: "Thought not found" });
        }

        res.status(201).json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Delete to pull and remove a reaction by the reaction's reactionId value
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const { thoughtId, reactionId } = req.params;

        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $pull: { reactions: { _id: reactionId } }, 
            },
            { new: true }
        );

        if (!updatedThought) {
            res.status(404).json({ message: "Thought not found" });
        }

        res.json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};