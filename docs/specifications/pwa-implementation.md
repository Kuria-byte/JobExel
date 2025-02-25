# JobExel Progressive Web App Implementation

## Overview
This document outlines the implementation strategy for transforming JobExel into a Progressive Web App (PWA), enabling offline functionality, push notifications, and native-like features.

## Core PWA Features

### 1. Service Worker Configuration

```typescript
// src/service-worker.ts
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

clientsClaim();
self.skipWaiting();

// Precache all static assets
precacheAndRoute(self.__WB_MANIFEST);

// Handle navigation requests
const handler = createHandlerBoundToURL('/index.html');
registerRoute(new NavigationRoute(handler));

// Cache API responses
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/jobs'),
  new NetworkFirst({
    cacheName: 'jobs-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  })
);

// Cache static assets
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Handle offline fallbacks
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async () => {
    try {
      return await fetch(request);
    } catch (error) {
      return caches.match('/offline.html');
    }
  }
);
```

### 2. Manifest Configuration

```json
// public/manifest.json
{
  "name": "JobExel - Career Management Platform",
  "short_name": "JobExel",
  "description": "AI-powered job application and career management platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0F172A",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### 3. Offline Data Management

```typescript
// src/lib/offline/offlineStore.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface JobExelDB extends DBSchema {
  applications: {
    key: string;
    value: Application;
    indexes: { 'by-status': string };
  };
  jobs: {
    key: string;
    value: Job;
    indexes: { 'by-company': string };
  };
  userProfile: {
    key: string;
    value: UserProfile;
  };
}

class OfflineStore {
  private db: IDBPDatabase<JobExelDB>;

  async initialize() {
    this.db = await openDB<JobExelDB>('jobexel-offline', 1, {
      upgrade(db) {
        // Applications store
        const applicationStore = db.createObjectStore('applications', {
          keyPath: 'id',
        });
        applicationStore.createIndex('by-status', 'status');

        // Jobs store
        const jobsStore = db.createObjectStore('jobs', {
          keyPath: 'id',
        });
        jobsStore.createIndex('by-company', 'company.name');

        // User profile store
        db.createObjectStore('userProfile', {
          keyPath: 'id',
        });
      },
    });
  }

  async saveApplication(application: Application) {
    await this.db.put('applications', application);
  }

  async getApplication(id: string) {
    return this.db.get('applications', id);
  }

  async getAllApplications() {
    return this.db.getAll('applications');
  }

  async syncOfflineChanges() {
    const tx = this.db.transaction('applications', 'readonly');
    const store = tx.objectStore('applications');
    const unsyncedApplications = await store.index('by-status').getAll('unsynced');

    for (const application of unsyncedApplications) {
      try {
        await api.applications.update(application);
        await this.db.put('applications', {
          ...application,
          status: 'synced',
        });
      } catch (error) {
        console.error('Failed to sync application:', error);
      }
    }
  }
}

export const offlineStore = new OfflineStore();
```

### 4. Push Notifications

```typescript
// src/lib/notifications/pushManager.ts
import { jobExelApi } from '@/store/api/jobExelApi';

class PushNotificationManager {
  private vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_KEY;

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await this.subscribeToPush();
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
    }
  }

  private async subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.vapidPublicKey,
      });

      await jobExelApi.endpoints.savePushSubscription.mutation({
        subscription: subscription.toJSON(),
      });
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }

  async sendNotification(title: string, options: NotificationOptions) {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, options);
  }
}

export const pushManager = new PushNotificationManager();
```

### 5. Background Sync

```typescript
// src/lib/sync/backgroundSync.ts
class BackgroundSyncManager {
  async registerSync() {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('jobexel-sync');
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }

  async performSync() {
    try {
      await offlineStore.syncOfflineChanges();
      await this.syncUserProfile();
      await this.syncApplications();
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }

  private async syncUserProfile() {
    const profile = await offlineStore.getUserProfile();
    if (profile?.needsSync) {
      await jobExelApi.endpoints.updateProfile.mutation(profile);
    }
  }

  private async syncApplications() {
    const applications = await offlineStore.getAllApplications();
    const unsyncedApplications = applications.filter(app => app.needsSync);

    for (const app of unsyncedApplications) {
      try {
        await jobExelApi.endpoints.updateApplication.mutation(app);
      } catch (error) {
        console.error('Failed to sync application:', error);
      }
    }
  }
}

export const backgroundSync = new BackgroundSyncManager();
```

## Integration with React Components

```typescript
// src/components/common/OfflineIndicator.tsx
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg">
      You are currently offline. Changes will sync when you're back online.
    </div>
  );
}

// src/hooks/useOfflineSupport.ts
export function useOfflineSupport<T>(
  query: () => Promise<T>,
  offlineData: () => Promise<T>
) {
  const isOnline = useOnlineStatus();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = isOnline ? await query() : await offlineData();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, [isOnline]);

  return { data, isOnline };
}
```

## Challenges and Solutions

### 1. Data Synchronization

**Challenge**: Maintaining data consistency between offline and online states.

**Solution**:
- Implement a queue system for offline changes
- Use timestamps for conflict resolution
- Batch sync operations when coming online

```typescript
// src/lib/sync/syncQueue.ts
class SyncQueue {
  private queue: Array<{
    action: string;
    data: any;
    timestamp: number;
  }> = [];

  async add(action: string, data: any) {
    this.queue.push({
      action,
      data,
      timestamp: Date.now(),
    });
    await this.persistQueue();
  }

  async process() {
    const sortedQueue = [...this.queue].sort((a, b) => a.timestamp - b.timestamp);
    
    for (const item of sortedQueue) {
      try {
        await this.processItem(item);
        this.queue = this.queue.filter(i => i.timestamp !== item.timestamp);
      } catch (error) {
        console.error('Failed to process queue item:', error);
      }
    }

    await this.persistQueue();
  }
}
```

### 2. Storage Management

**Challenge**: Managing limited storage space efficiently.

**Solution**:
- Implement storage quotas
- Clear old cached data
- Prioritize critical data

```typescript
// src/lib/storage/storageManager.ts
class StorageManager {
  private readonly STORAGE_QUOTA = 50 * 1024 * 1024; // 50MB

  async checkStorageQuota() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const { usage, quota } = await navigator.storage.estimate();
      const usagePercentage = (usage / quota) * 100;

      if (usagePercentage > 90) {
        await this.clearOldCache();
      }
    }
  }

  async clearOldCache() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.startsWith('jobexel-') && 
      this.isOlderThanOneWeek(name)
    );

    await Promise.all(oldCaches.map(name => caches.delete(name)));
  }
}
```

### 3. Performance Optimization

**Challenge**: Maintaining app performance with offline capabilities.

**Solution**:
- Implement efficient caching strategies
- Use IndexedDB for large datasets
- Optimize asset loading

```typescript
// src/lib/performance/assetLoader.ts
class AssetLoader {
  async preloadCriticalAssets() {
    const criticalAssets = [
      '/images/logo.svg',
      '/fonts/Inter.woff2',
      '/css/critical.css',
    ];

    const cache = await caches.open('critical-assets');
    await cache.addAll(criticalAssets);
  }

  async prefetchAssets(assets: string[]) {
    const cache = await caches.open('prefetched-assets');
    await Promise.all(
      assets.map(async (asset) => {
        if (!(await cache.match(asset))) {
          await cache.add(asset);
        }
      })
    );
  }
}
```

## Best Practices

1. **Progressive Enhancement**
   - Start with core functionality
   - Add offline features gradually
   - Provide fallbacks for unsupported features

2. **Performance**
   - Minimize main thread blocking
   - Optimize service worker size
   - Use appropriate caching strategies

3. **User Experience**
   - Clear offline indicators
   - Seamless sync transitions
   - Helpful error messages

4. **Security**
   - Secure data storage
   - Safe sync operations
   - Protected API endpoints

## Testing Strategy

```typescript
// src/tests/pwa/offline.test.ts
describe('Offline Functionality', () => {
  beforeEach(async () => {
    await offlineStore.initialize();
  });

  test('should store application data offline', async () => {
    const application = mockApplication();
    await offlineStore.saveApplication(application);
    const stored = await offlineStore.getApplication(application.id);
    expect(stored).toEqual(application);
  });

  test('should sync data when coming online', async () => {
    const syncManager = new BackgroundSyncManager();
    await syncManager.performSync();
    // Verify sync results
  });
});
``` 