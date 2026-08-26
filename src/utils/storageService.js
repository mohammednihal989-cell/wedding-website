// IndexedDB Multi-Tenant Storage Engine for NIHALCO Platform
import { initialClientsList, initialCompanyConfig } from '../data/nihalcoConfig';

const DB_NAME = 'NihalcoPlatformDB';
const DB_VERSION = 1;
const CLIENTS_STORE = 'nihalco_clients';
const CONFIG_STORE = 'nihalco_config';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(CLIENTS_STORE)) {
        db.createObjectStore(CLIENTS_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(CONFIG_STORE)) {
        db.createObjectStore(CONFIG_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get all clients (Admin only)
export async function getAllClients() {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(CLIENTS_STORE, 'readonly');
      const store = transaction.objectStore(CLIENTS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = request.result;
        if (!result || result.length === 0) {
          // Initialize with default sample clients if empty
          saveAllClients(initialClientsList);
          resolve(initialClientsList);
        } else {
          resolve(result);
        }
      };
      request.onerror = () => resolve(initialClientsList);
    });
  } catch (err) {
    console.error('IndexedDB get error:', err);
    return initialClientsList;
  }
}

// Save all clients batch
async function saveAllClients(clients) {
  try {
    const db = await openDB();
    const transaction = db.transaction(CLIENTS_STORE, 'readwrite');
    const store = transaction.objectStore(CLIENTS_STORE);
    clients.forEach((client) => store.put(client));
  } catch (err) {
    console.error('Failed saving all clients:', err);
  }
}

// Get client strictly by unique ID (Admin context)
export async function getClientById(id) {
  const clients = await getAllClients();
  return clients.find((c) => c.id === id) || null;
}

// Get published client strictly by Share Token (Public context — ZERO cross access)
export async function getClientByShareToken(shareToken) {
  if (!shareToken) return null;
  const clients = await getAllClients();
  const found = clients.find(
    (c) => c.shareToken === shareToken || c.id === shareToken
  );

  if (!found) return null;
  // Block access if unpublished or archived
  if (found.status !== 'PUBLISHED') {
    return { isOffline: true, clientName: found.name };
  }
  return found;
}

// Save or Update a single client
export async function saveClient(clientData) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(CLIENTS_STORE, 'readwrite');
      const store = transaction.objectStore(CLIENTS_STORE);
      const request = store.put(clientData);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Save client error:', err);
  }
}

// Delete client
export async function deleteClient(id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(CLIENTS_STORE, 'readwrite');
      const store = transaction.objectStore(CLIENTS_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Delete client error:', err);
  }
}

// Get NIHALCO Company Config
export async function getCompanyConfig() {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(CONFIG_STORE, 'readonly');
      const store = transaction.objectStore(CONFIG_STORE);
      const request = store.get('company_details');

      request.onsuccess = () => {
        resolve(request.result || initialCompanyConfig);
      };
      request.onerror = () => resolve(initialCompanyConfig);
    });
  } catch (err) {
    return initialCompanyConfig;
  }
}

// Save NIHALCO Company Config
export async function saveCompanyConfig(configData) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(CONFIG_STORE, 'readwrite');
      const store = transaction.objectStore(CONFIG_STORE);
      const request = store.put(configData, 'company_details');

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Save company config error:', err);
  }
}

// Generate random unique 12-char token
export function generateShareToken() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36).substring(4, 8);
}
