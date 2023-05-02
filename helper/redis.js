const Redis=require("ioredis")

let configuration={
    host:"redis-17413.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port:17413,
    username:"default",
    password:"bYUXeWDsZJJ78nKw6T4fGSU6XJRVWLtG",
}
const redis = new Redis(configuration);
module.exports={redis}