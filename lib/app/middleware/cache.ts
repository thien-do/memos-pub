import LRU from 'lru-cache';
import { NextApiRequest, NextApiResponse } from 'next';

const CACHE_MAX_SIZE = 50; // MB
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // Seconds

const lruCache = new LRU({
    max: CACHE_MAX_SIZE,
    maxAge: CACHE_MAX_AGE
});

interface CachedRequestHandler {
    (req: NextApiRequest, res: NextApiResponse, cache: LRU<unknown, unknown>): unknown;
}

const cache = (handler: Function) => (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res, lruCache);
};

export default cache;