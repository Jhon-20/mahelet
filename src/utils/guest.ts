import guests from '../config/guests.json';

export interface Guest {
  key: string;
  name: string;
  passes: number;
}

const STORAGE_KEY = 'mahelet-guest-key';

const findGuest = (raw: string | null | undefined): Guest | undefined => {
  const key = raw?.trim().toLowerCase();
  return key ? (guests as Guest[]).find((g) => g.key === key) : undefined;
};

const readStored = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // modo privado / almacenamiento bloqueado
  }
};

const store = (key: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* sin almacenamiento: seguimos sin recordar */
  }
};

/**
 * Busca al invitado por la clave de la URL. Acepta ?i=clave (recomendado), ?clave, /clave y #clave.
 * Si la clave de la URL es válida, la recuerda en el navegador. Si no hay clave (o es inválida),
 * usa la recordada. Si tampoco hay, devuelve null (invitación general).
 */
export const getGuestFromUrl = (): Guest | null => {
  const { search, pathname, hash } = window.location;
  const params = new URLSearchParams(search);
  const candidates = [
    params.get('i'),
    ...params.keys(),
    pathname.split('/').filter(Boolean).pop(),
    hash.replace(/^#\/?/, ''),
  ];
  for (const c of candidates) {
    const guest = findGuest(c);
    if (guest) {
      store(guest.key);
      return guest;
    }
  }
  return findGuest(readStored()) ?? null;
};
