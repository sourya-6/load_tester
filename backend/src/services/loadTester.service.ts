import axios from "axios";
import { LoadTestRequest, LoadTestResponse, SingleResult } from "../types"




const sleep = ((ms:number) => new Promise(resolve => setTimeout(resolve,ms)))

const makeRequest = async(url:string,method:"GET"|"POST"|"PATCH" |"PUT" |"DELETE" ,retries = 3):Promise<SingleResult> =>{
    let attempt = 0;
    while(attempt < retries){
        const start = Date.now();

        try {
            await axios({url,method,timeout:500})
            //for having the authentication({url,method,headers:data.headers,data:data.body})
            const end = Date.now();
            return{
                status:"success",
                time:end - start
            }

        } catch (error:any) {

            const end = Date.now();
            if(error.response?.status === 429 || !error.response){
                if(attempt === retries){
                    return{
                        status:"rate_limited",
                        time:end - start
                    }
                }

                const delay = Math.pow(2,attempt)* 100 + Math.random()*100;
                await sleep(delay);

                attempt++;
                continue;
            }  
            return{
                status:"fail",
                time:end - start
            }
        }
    }
    return{
            status:"fail",
            time:0
        }
} 
export const runLoadTest = async (data: LoadTestRequest): Promise<LoadTestResponse> => {
    const {totalRequests,method,url} = data;
    const results:SingleResult[] = [];
    const batchSize = 100;
    for(let i = 0; i< totalRequests;i+=batchSize){
        const batch:Promise<SingleResult>[] = [];
        
        const currBatch = Math.min(batchSize,totalRequests - i);
        for(let j = 0; j < currBatch; j++){
            // const req = (async():Promise<SingleResult> =>{
            //     const start = Date.now();
            //     try {
            //         await axios({url,method});
            //         const end = Date.now();
            //         return{
            //             status:"success",
            //             time:end - start
            //         }

            //     } catch (error:any) {
            //         const end = Date.now();
            //         if(error.response?.status === 429){
            //             return{
            //                 status:"rate-limit",
            //                 time: end - start
            //             }
            //         }

            //         return{
            //             status:"fail",
            //             time:end - start
            //         }
            //     }

            // })();
            const req = makeRequest(url,method)
            batch.push(req);
        }
        const batchResults = await Promise.all(batch);
        results.push(...batchResults);
        await new Promise((res)=>setTimeout(res,Math.random()*100+100));
    }
    const success = results.filter(r => r.status ==="success").length;
    const rateLimit = results.filter(r => r.status ==="rate_limited").length;
    const fail = results.length - (success+rateLimit);

    const times = results.map(t => t.time);
    
    // const avgTime = times.reduce((a,b)=> a+b,0)/times.length;
    const avgTime = times.length 
    ? times.reduce((a,b)=> a+b,0)/times.length
    : 0;

    // const minTime = Math.min(...times);
    const minTime = times.length?Math.min(...times):0;
    // const maxTime = Math.max(...times);

    const maxTime = times.length ? Math.max(...times) : 0;
    return {
        total:results.length,
        success,
        failed:fail,
        rateLimit,
        avgTime,
        minTime,
        maxTime
    }
}

