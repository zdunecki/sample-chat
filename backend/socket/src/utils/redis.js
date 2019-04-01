const redis = require("redis");
const {promisify} = require('util');

const allHashes = hashes => Object.values(hashes).map(hash => JSON.parse(hash));

const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';

const client = redis.createClient(redisPort, redisHost);
const pub = redis.createClient(redisPort, redisHost);
const sub = redis.createClient(redisPort, redisHost);

const hset = promisify(client.hset).bind(client);
const hdel = promisify(client.hdel).bind(client);
const hgetall = promisify(client.hgetall).bind(client);
const hget = promisify(client.hget).bind(client);

module.exports = {
    redisPort,
    redisHost,
    pub,
    sub,
    hset,
    hdel,
    hgetall,
    hget,
    allHashes,
};