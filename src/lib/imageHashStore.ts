import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Memory cache for quick hash lookups during server lifecycle
// assetKey -> current active hash
const memoryHashCache = new Map<string, string>();

// versionId -> hash
const versionHashMap = new Map<string, string>();

// Persisted JSON cache file
const HASH_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'image_hashes.json');

/**
 * Loads stored hashes from disk into memory cache
 */
function loadPersistedHashes(): Record<string, string> {
  try {
    if (fs.existsSync(HASH_FILE_PATH)) {
      const raw = fs.readFileSync(HASH_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (parsed.assets && typeof parsed.assets === 'object') {
          Object.entries(parsed.assets).forEach(([k, v]) => {
            if (typeof v === 'string') memoryHashCache.set(k, v);
          });
        }
        if (parsed.versions && typeof parsed.versions === 'object') {
          Object.entries(parsed.versions).forEach(([k, v]) => {
            if (typeof v === 'string') versionHashMap.set(k, v);
          });
        }
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[imageHashStore] Could not read persisted hash file:', err);
  }
  return {};
}

/**
 * Saves in-memory hashes to disk
 */
function savePersistedHashes(): void {
  try {
    const assetsObj: Record<string, string> = {};
    memoryHashCache.forEach((v, k) => {
      assetsObj[k] = v;
    });

    const versionsObj: Record<string, string> = {};
    versionHashMap.forEach((v, k) => {
      versionsObj[k] = v;
    });

    const dir = path.dirname(HASH_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      HASH_FILE_PATH,
      JSON.stringify({ assets: assetsObj, versions: versionsObj }, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.warn('[imageHashStore] Could not write persisted hash file:', err);
  }
}

// Initialize on module import
loadPersistedHashes();

/**
 * Computes cryptographic SHA-256 hash of a file buffer
 */
export function computeBufferHash(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Normalizes an asset key (e.g. folder + filename or canonical URL)
 */
export function normalizeAssetKey(key: string): string {
  if (!key) return '';
  let pathStr = key;
  try {
    if (key.startsWith('http://') || key.startsWith('https://')) {
      const parsed = new URL(key);
      pathStr = parsed.pathname;
    }
  } catch {
    // ignore URL parse errors
  }
  // Strip all query parameters, hashes, and repeated leading /tripkario prefixes
  pathStr = pathStr.split('?')[0].split('#')[0];
  while (pathStr.startsWith('/tripkario')) {
    pathStr = pathStr.slice('/tripkario'.length);
  }
  if (!pathStr.startsWith('/')) {
    pathStr = '/' + pathStr;
  }
  return pathStr.toLowerCase().replace(/\/+/g, '/');
}

/**
 * Retrieves the stored SHA-256 hash for a given asset key
 */
export function getStoredAssetHash(assetKey: string): string | null {
  const normalized = normalizeAssetKey(assetKey);
  return memoryHashCache.get(normalized) || null;
}

/**
 * Records or updates the stored SHA-256 hash for a given asset key and optional versionId
 */
export function recordAssetHash(assetKey: string, hash: string, versionId?: string): void {
  const normalized = normalizeAssetKey(assetKey);
  if (!normalized || !hash) return;
  memoryHashCache.set(normalized, hash);
  if (versionId) {
    versionHashMap.set(versionId, hash);
  }
  savePersistedHashes();
}

/**
 * Associates a versionId with a content hash
 */
export function recordVersionHash(versionId: string, hash: string): void {
  if (!versionId || !hash) return;
  versionHashMap.set(versionId, hash);
  savePersistedHashes();
}

/**
 * Gets the content hash for a specific versionId
 */
export function getVersionHash(versionId: string): string | null {
  return versionHashMap.get(versionId) || null;
}

/**
 * Downloads the canonical raw image from a remote URL and calculates its SHA-256 hash
 */
export async function computeRemoteImageHash(imageUrl: string): Promise<string | null> {
  if (!imageUrl || imageUrl.startsWith('data:')) return null;
  try {
    // Strip delivery transformation parameters and append cache buster to get raw binary
    const cleanUrl = imageUrl.split('?')[0];
    const fetchUrl = `${cleanUrl}?ik-cache-buster=${Date.now()}`;
    const res = await fetch(fetchUrl, {
      cache: 'no-store',
      headers: {
        Accept: 'image/*',
      },
    });

    if (!res.ok) {
      console.warn(`[imageHashStore] Failed to fetch remote image ${cleanUrl}: HTTP ${res.status}`);
      return null;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const hash = computeBufferHash(buffer);
    return hash;
  } catch (err) {
    console.warn('[imageHashStore] Error computing remote image hash:', err);
    return null;
  }
}

/**
 * Core Deduplication Check:
 * Compares incoming buffer against existing asset hash (stored or dynamically fetched).
 * Returns { isDuplicate: true } if binaries are byte-for-byte identical.
 */
export async function checkIsDuplicateImage(
  newBuffer: Buffer,
  assetKey: string,
  currentImageUrl?: string
): Promise<{
  isDuplicate: boolean;
  currentHash: string | null;
  newHash: string;
}> {
  const newHash = computeBufferHash(newBuffer);
  const normalizedKey = normalizeAssetKey(assetKey);

  // 1. Check local hash registry
  let currentHash = getStoredAssetHash(normalizedKey);

  // 2. If no hash stored yet, compute hash from current remote image asset
  if (!currentHash && currentImageUrl) {
    currentHash = await computeRemoteImageHash(currentImageUrl);
    if (currentHash) {
      recordAssetHash(normalizedKey, currentHash);
    }
  }

  // 3. Compare hashes
  const isDuplicate = Boolean(currentHash && currentHash === newHash);

  return {
    isDuplicate,
    currentHash,
    newHash,
  };
}
