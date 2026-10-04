import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URI;

// Caching is optional for local previews; skip it when no Redis endpoint is configured.
export const redis = redisUrl
  ? new Redis(redisUrl)
  : {
      get: async (key: string) => {
        void key;
        return null;
      },
      set: async (key: string, value: string) => {
        void key;
        void value;
        return "OK" as const;
      },
      del: async (...keys: Array<string | string[]>) => {
        void keys;
        return 0;
      },
    };
