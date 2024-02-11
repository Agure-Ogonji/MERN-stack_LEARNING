import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";


export const generateChatCompletion = async (req: Request, res:Response, next:NextFunction) => {
    const {message} = req.body;

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({message: "THE USER IS NOT REGISTERED OR TOKEN DISRUPTED"});
    
        
        const chats = user.chats.map(({role, content})=>({role, content})) as ChatCompletionMessageParam[];
    
        chats.push({content:message, role: "user"});
        user.chats.push({content: message, role: "user"});
    
        const config = configureOpenAI();
        
        // const OpenAIApi = require("openai");
        //@ts-ignore
        const openai = new OpenAI(config);
        const chatResponse = await openai.chat.completions.create({model: "gpt-3.5-turbo", messages: chats,});
    
        //@ts-ignore
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "SOMETHING IS WRONG"});
    }
};

export const sendChatsToUser = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("THE USER IS NOT REGISTERED OR TOKEN DISRUPTED");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("PERMISSIONS DID NOT MATCH");
        }
        return res.status(200).json({message:"OK",chats:user.chats});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause:error.message});
        
    }
};

export const deleteChats = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("USER NOT REGISTERED OR TOKEN DISRUPTED");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("PERMISSIONS DID NOT MATCH");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message});
        
    }
};