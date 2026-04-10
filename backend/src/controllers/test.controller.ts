import { Request,Response } from "express";
import { runLoadTest } from "../services/loadTester.service";
import {LoadTestRequest,LoadTestResponse,SingleResult} from "../types"

export const testController = async(req:Request,res:Response) =>{
    try {
        const data:LoadTestRequest = req.body;
        const result = await runLoadTest(data);
        res.json(result)
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
} 