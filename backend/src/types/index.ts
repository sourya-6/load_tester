export interface LoadTestRequest{
    url:string,
    method:"GET" | "POST",
    totalRequests:number
}

export interface SingleResult{
    status : "success" |"fail"|"rate_limited";
    time:number
}

export interface LoadTestResponse{
    total:number;
    success:number;
    failed:number;
    rateLimit:number
    avgTime:number;
    minTime:number;
    maxTime:number;

}