export const EXPIRES_TIME = 864000
export const JWT_TIME = '10d'
import NodeCache from 'node-cache';
const myCache = new NodeCache();
myCache.set('keyWithTTL', 'value', EXPIRES_TIME);
export { myCache };