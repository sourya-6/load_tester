export interface LoadTestRequest{
    url:string,
    method:"GET" | "POST",
    totalRequests:number
}

export interface SingleResult{
    status : "success" |"fail";
    time:number
}

export interface LoadTestResponse{
    total:number;
    success:number;
    failed:number;
    avgTime:number;
    minTime:number;
    maxTime:number;

}