import dayjs from 'dayjs';
import { openDB } from 'idb';

const DB_NAME = 'NotesDB';
const DB_VERSION = 1;
const STORE_NAME = 'notes';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveNote = async (content: string, dayOfYear: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put({ id: dayOfYear, content, date: new Date() });
  await tx.done;
};

export const getNote = async (dayOfYear: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const note = await store.get(dayOfYear);
  await tx.done;
  return note;
};

export const getNotesByDateRange = async (startDate: number, endDate: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const notes = await store.getAll();
  await tx.done;
  return notes.filter((note) => {
    const noteDayOfYear = note.id;
    return noteDayOfYear >= startDate && noteDayOfYear <= endDate;
  });
};
