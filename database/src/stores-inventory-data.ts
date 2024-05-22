import type {
  NodeRedisClientType,
  IStore,
  IStoreInventory,
  IZipCode,
} from './config.js';

import { PrismaClient, Prisma } from '@prisma/client';

import * as CONFIG from './config.js';
import { deleteExistingKeysInRedis } from './utils.js';

const addZipCodeDetailsInRedis = async (redisClient: NodeRedisClientType) => {
  await deleteExistingKeysInRedis(CONFIG.ZIP_CODE_KEY_PREFIX, redisClient);

  const zipCodeDetails: IZipCode[] = [
    {
      zipLocation: {
        latitude: 40.785091,
        longitude: -73.968285,
      },
      zipCode: 10022,
    },
    {
      zipLocation: {
        latitude: 40.93121,
        longitude: -73.898747,
      },
      zipCode: 10701,
    },
    {
      zipLocation: {
        latitude: 41.033986,
        longitude: -73.76291,
      },
      zipCode: 10601,
    },
    {
      zipLocation: {
        latitude: 40.911488,
        longitude: -73.782355,
      },
      zipCode: 10801,
    },
    {
      zipLocation: {
        latitude: 42.886447,
        longitude: -78.878369,
      },
      zipCode: 14202,
    },
    {
      zipLocation: {
        latitude: 43.16103,
        longitude: -77.610924,
      },
      zipCode: 14604,
    },
    {
      zipLocation: {
        latitude: 43.048122,
        longitude: -76.147424,
      },
      zipCode: 13202,
    },
    {
      zipLocation: {
        latitude: 42.65258,
        longitude: -73.756233,
      },
      zipCode: 12207,
    },
    {
      zipLocation: {
        latitude: 42.098687,
        longitude: -75.917974,
      },
      zipCode: 13901,
    },
    {
      zipLocation: {
        latitude: 40.837049,
        longitude: -73.86543,
      },
      zipCode: 10451,
    },
    {
      zipLocation: {
        latitude: 40.678178,
        longitude: -73.944158,
      },
      zipCode: 11201,
    },
    {
      zipLocation: {
        latitude: 40.728224,
        longitude: -73.794852,
      },
      zipCode: 11354,
    },
    {
      zipLocation: {
        latitude: 40.579532,
        longitude: -74.150201,
      },
      zipCode: 10301,
    },
    {
      zipLocation: {
        latitude: 40.706212,
        longitude: -73.618739,
      },
      zipCode: 11550,
    },
    {
      zipLocation: {
        latitude: 40.963434,
        longitude: -72.184801,
      },
      zipCode: 11937,
    },
    {
      zipLocation: {
        latitude: 41.503427,
        longitude: -74.010418,
      },
      zipCode: 12550,
    },
    {
      zipLocation: {
        latitude: 42.443961,
        longitude: -76.501881,
      },
      zipCode: 14850,
    },
    {
      zipLocation: {
        latitude: 41.700371,
        longitude: -73.92097,
      },
      zipCode: 12601,
    },
    {
      zipLocation: {
        latitude: 43.096214,
        longitude: -79.037739,
      },
      zipCode: 14301,
    },
    {
      zipLocation: {
        latitude: 43.08313,
        longitude: -73.784565,
      },
      zipCode: 12866,
    },
  ];

  for (let zipCodeData of zipCodeDetails) {
    zipCodeData.statusCode = 1;
    if (typeof zipCodeData?.zipLocation != 'string') {
      //zipLocation = "-73.41512,40.79343"
      zipCodeData.zipLocation =
        zipCodeData.zipLocation?.longitude +
        ',' +
        zipCodeData.zipLocation?.latitude;
    }
    const id = CONFIG.ZIP_CODE_KEY_PREFIX + ':' + zipCodeData.zipCode;
    //@ts-ignore
    await redisClient.json.set(id, '.', zipCodeData);
  }
};

const getStoreDetails = (): IStore[] => {
  //consider following sample stores in NewYork state (USA)

  const stores: IStore[] = [
    {
      storeId: '01_NY_BUFFALO',
      storeName: 'Buffalo',
      storeLocation: {
        latitude: 42.88023,
        longitude: -78.878738,
      },
    },
    {
      storeId: '02_NY_ROCHESTER',
      storeName: 'Rochester',
      storeLocation: {
        latitude: 43.156578,
        longitude: -77.608849,
      },
    },
    {
      storeId: '03_NY_BINGHAMTON',
      storeName: 'Binghamton',
      storeLocation: {
        latitude: 42.098701,
        longitude: -75.912537,
      },
    },
    {
      storeId: '04_NY_SYRACUSE',
      storeName: 'Syracuse',
      storeLocation: {
        latitude: 43.088947,
        longitude: -76.15448,
      },
    },
    {
      storeId: '05_NY_WATERTOWN',
      storeName: 'Watertown',
      storeLocation: {
        latitude: 43.974785,
        longitude: -75.910759,
      },
    },
    {
      storeId: '06_NY_UTICA',
      storeName: 'Utica',
      storeLocation: {
        latitude: 43.107204,
        longitude: -75.252312,
      },
    },
    {
      storeId: '07_NY_ALBANY',
      storeName: 'Albany',
      storeLocation: {
        latitude: 42.65258,
        longitude: -73.756233,
      },
    },
    {
      storeId: '08_NY_PLATTSBURGH',
      storeName: 'Plattsburgh',
      storeLocation: {
        latitude: 44.699764,
        longitude: -73.471428,
      },
    },
    {
      storeId: '09_NY_NEW_YORK_CITY',
      storeName: 'New York City',
      storeLocation: {
        latitude: 40.73061,
        longitude: -73.935242,
      },
    },
    {
      storeId: '10_NY_POUGHKEEPSIE',
      storeName: 'Poughkeepsie',
      storeLocation: {
        latitude: 41.70829,
        longitude: -73.923912,
      },
    },
    {
      storeId: '11_NY_MELVILLE',
      storeName: 'Melville',
      storeLocation: {
        latitude: 40.79343,
        longitude: -73.41512,
      },
    },
  ];

  return stores;
};

const getRandomStores = (_count: number): IStore[] => {
  const stores = getStoreDetails();

  const shuffleArray = stores;
  for (let i = shuffleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
  }

  return stores.slice(0, _count);
};

const addStoresToDatabase = async (prisma: PrismaClient) => {
  const stores = getStoreDetails();
  if (stores?.length) {
    console.log(`Deleting existing stores (if any)`);
    await prisma.storeInventory.deleteMany({});
    await prisma.store.deleteMany({});

    for (let store of stores) {
      if (typeof store?.storeLocation != 'string') {
        store.storeLocation =
          store.storeLocation?.longitude + ',' + store.storeLocation?.latitude;
      }
      let storeDB: Prisma.StoreCreateInput = {
        storeId: store.storeId ?? '',
        storeName: store.storeName,
        storeLocation: store.storeLocation,
        statusCode: 1,
      };
      await prisma.store.create({
        data: storeDB,
      });
    }
  }
};

const addStoreInventoryToDatabase = async (
  prisma: PrismaClient,
  storeInventory: IStoreInventory,
) => {
  if (storeInventory) {
    let storeInventoryDB: Prisma.StoreInventoryCreateInput = {
      Store: {
        connect: {
          storeId: storeInventory.storeId,
        },
      },
      productId: storeInventory.productId ?? '',
      stockQty: storeInventory.stockQty ?? 0,
      statusCode: storeInventory.statusCode,
    };

    await prisma.storeInventory.create({
      data: storeInventoryDB,
    });
  }
};

const addProductsToRandomStoresInRedis = async (
  _products: Prisma.ProductCreateInput[],
  _storeCount: number,
  redisClient: NodeRedisClientType,
  prisma: PrismaClient,
) => {
  try {
    if (_products?.length && redisClient) {
      await deleteExistingKeysInRedis(
        CONFIG.STORE_INVENTORY_KEY_PREFIX,
        redisClient,
      );

      for (let product of _products) {
        const randomStores = getRandomStores(_storeCount);
        for (let store of randomStores) {
          if (typeof store?.storeLocation != 'string') {
            //"-73.41512,40.79343"
            store.storeLocation =
              store.storeLocation?.longitude +
              ',' +
              store.storeLocation?.latitude;
          }
          const storesInventory: IStoreInventory = {
            storeId: store.storeId,
            storeName: store.storeName,
            storeLocation: store.storeLocation,
            productId: product.productId,
            productDisplayName: product.productDisplayName,
            stockQty: CONFIG.MAX_PRODUCT_QTY_IN_STORE,
            statusCode: 1,
          };
          //id used in triggers too
          const id =
            CONFIG.STORE_INVENTORY_KEY_PREFIX +
            ':' +
            store.storeId +
            '_' +
            product.productId;
          //@ts-ignore
          await redisClient.json.set(id, '.', storesInventory);
          // console.log(id);

          await addStoreInventoryToDatabase(prisma, storesInventory);
        }
      }
    }
  } catch (err) {
    console.log(`addProductToRandomStoresInRedis failed `, err);
  }
};

export {
  deleteExistingKeysInRedis,
  addProductsToRandomStoresInRedis,
  addZipCodeDetailsInRedis,
  addStoresToDatabase,
};
