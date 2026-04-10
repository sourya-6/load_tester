import axios from "axios";
import { LoadTestRequest, LoadTestResponse, SingleResult } from "../types"


export const runLoadTest = async (data: LoadTestRequest): Promise<LoadTestResponse> => {
    const { totalRequests, url, method } = data;
    const requests: Promise<SingleResult>[] = [];

    for (let i = 0; i < totalRequests; i++) {
        //Single Request Response it will give
        const req = (async (): Promise<SingleResult> => {
            const start = Date.now();
            try {
                await axios({
                    url,
                    method
                })
                const end = Date.now();
                return {
                    status: "success",
                    time: end - start

                }
            } catch (error) {
                const end = Date.now();
                return{
                    status:"fail",
                    time:end - start
                }
            }
        })();
        requests.push(req);  
    }
    const results = await Promise.all(requests);
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

