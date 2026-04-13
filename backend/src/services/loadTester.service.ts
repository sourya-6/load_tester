import axios, { toFormData } from "axios";
import { LoadTestRequest, LoadTestResponse, SingleResult } from "../types"


export const runLoadTest = async (data: LoadTestRequest): Promise<LoadTestResponse> => {
    const {totalRequests,method,url} = data;
    const results:SingleResult[] = [];
    const batchSize = 50;
    for(let i = 0; i< totalRequests;i+=batchSize){
        const batch:Promise<SingleResult>[] = [];
        
        const currBatch = Math.min(batchSize,totalRequests - i);
        for(let j = 0; j < currBatch; j++){
            const req = (async():Promise<SingleResult> =>{
                const start = Date.now();
                try {
                    await axios({url,method});
                    const end = Date.now();
                    return{
                        status:"success",
                        time:end - start
                    }

                } catch (error) {
                    const end = Date.now();

                    return{
                        status:"fail",
                        time:end - start
                    }
                }

            })();
            batch.push(req);
        }
        const batchResults = await Promise.all(batch);
        results.push(...batchResults);
        await new Promise((res)=>setTimeout(res,50));
    }
    const success = results.filter(r => r.status ==="success").length;
    const fail = results.length - success;

    const times = results.map(t => t.time);
    
    const avgTime = times.reduce((a,b)=> a+b,0)/times.length;

    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    return {
        total:results.length,
        success,
        failed:fail,
        avgTime,
        minTime,
        maxTime
    }
}

