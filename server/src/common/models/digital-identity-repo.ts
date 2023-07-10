import {
  getNodeRedisClient,
  RedisSchema,
  RedisRepository,
  RedisEntityId,
} from '../utils/redis/redis-wrapper';

const DIGITAL_IDENTITY_KEY_PREFIX = 'DigitalIdentity';

const schema = new RedisSchema(DIGITAL_IDENTITY_KEY_PREFIX, {
  action: { type: 'string' },
  browserFingerprint: { type: 'string' },
  ipAddress: { type: 'string' },
  userId: { type: 'string' },
  sessionId: { type: 'string' },
  identityScore: { type: 'string' },

  createdOn: { type: 'date' },
  createdBy: { type: 'string' },
  lastUpdatedOn: { type: 'date' },
  lastUpdatedBy: { type: 'string' },
  statusCode: { type: 'number' },
});

/*
 A Repository is the main interface into Redis OM. It gives us the methods to read, write, and remove a specific Entity
 */

const getRepository = () => {
  const redisClient = getNodeRedisClient();
  const repository = new RedisRepository(schema, redisClient);
  return repository;
};

/*
we need to create an index or we won't be able to search.
Redis OM uses hash to see if index needs to be recreated or not 
*/

const createRedisIndex = async () => {
  const repository = getRepository();
  await repository.createIndex();
};

export { getRepository, createRedisIndex, RedisEntityId };
