import guests from '../config/guests.json';

export interface Guest {
  key: string;
  name: string;
  passes: number;
}

/**
 * Busca al invitado por la clave de la URL. Acepta ?i=clave (recomendado), ?clave, /clave y #clave.
 * Si no hay clave o no existe, devuelve null (invitación general).
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
    const key = c?.trim().toLowerCase();
    const guest = key ? (guests as Guest[]).find((g) => g.key === key) : undefined;
    if (guest) return guest;
  }
  return null;
};
