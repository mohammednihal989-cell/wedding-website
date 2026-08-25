// IndexedDB Storage Service for high-capacity photo & data persistence
const DB_NAME = 'WeddingMagazineDB';
const DB_VERSION = 1;
const STORE_KEY = 'wedding_data_store';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_KEY)) {
        db.createObjectStore(STORE_KEY);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getStoredWeddingData() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_KEY, 'readonly');
      const store = transaction.objectStore(STORE_KEY);
      const request = store.get('current_wedding');

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('IndexedDB get error, fallback to localStorage:', err);
    const fallback = localStorage.getItem('wedding_magazine_data');
    return fallback ? JSON.parse(fallback) : null;
  }
}

export async function saveWeddingData(data) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_KEY, 'readwrite');
      const store = transaction.objectStore(STORE_KEY);
      const request = store.put(data, 'current_wedding');

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('IndexedDB save error:', err);
    // Fallback storing minimal metadata to localStorage if Blobs are light
    try {
      localStorage.setItem('wedding_magazine_data', JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage full:', e);
    }
  }
}

export async function clearWeddingData() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_KEY, 'readwrite');
      const store = transaction.objectStore(STORE_KEY);
      const request = store.delete('current_wedding');

      request.onsuccess = () => {
        localStorage.removeItem('wedding_magazine_data');
        resolve(true);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    localStorage.removeItem('wedding_magazine_data');
  }
}
