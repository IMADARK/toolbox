import { getCalendars } from 'expo-localization';
import { format, utcToZonedTime } from 'date-fns-tz';
import { fr } from 'date-fns/locale';

export const TIMEZONE_PRESETS = [
  { label: '🇫🇷 France', zone: 'Europe/Paris', flag: '🇫🇷' },
  { label: '🇲🇦 Maroc', zone: 'Africa/Casablanca', flag: '🇲🇦' },
  { label: '🇩🇿 Algérie', zone: 'Africa/Algiers', flag: '🇩🇿' },
  { label: '🇹🇳 Tunisie', zone: 'Africa/Tunis', flag: '🇹🇳' },
  { label: '🇸🇳 Sénégal', zone: 'Africa/Dakar', flag: '🇸🇳' },
  { label: '🇨🇮 Côte d\'Ivoire', zone: 'Africa/Abidjan', flag: '🇨🇮' },
  { label: '🇨🇲 Cameroun', zone: 'Africa/Douala', flag: '🇨🇲' },
  { label: '🇬🇧 Angleterre', zone: 'Europe/London', flag: '🇬🇧' },
  { label: '🇪🇸 Espagne', zone: 'Europe/Madrid', flag: '🇪🇸' },
  { label: '🇩🇪 Allemagne', zone: 'Europe/Berlin', flag: '🇩🇪' },
  { label: '🇮🇹 Italie', zone: 'Europe/Rome', flag: '🇮🇹' },
  { label: '🇵🇹 Portugal', zone: 'Europe/Lisbon', flag: '🇵🇹' },
  { label: '🇧🇷 Brésil', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { label: '🇦🇷 Argentine', zone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { label: '🇺🇸 États-Unis (Est)', zone: 'America/New_York', flag: '🇺🇸' },
  { label: '🇺🇸 États-Unis (Ouest)', zone: 'America/Los_Angeles', flag: '🇺🇸' },
  { label: '🇯🇵 Japon', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { label: '🇰🇷 Corée du Sud', zone: 'Asia/Seoul', flag: '🇰🇷' },
  { label: '🇸🇦 Arabie Saoudite', zone: 'Asia/Riyadh', flag: '🇸🇦' },
  { label: '🇶🇦 Qatar', zone: 'Asia/Qatar', flag: '🇶🇦' },
  { label: '🇦🇺 Australie', zone: 'Australia/Sydney', flag: '🇦🇺' },
  { label: '🇨🇦 Canada', zone: 'America/Toronto', flag: '🇨🇦' },
  { label: '🇲🇽 Mexique', zone: 'America/Mexico_City', flag: '🇲🇽' },
];

export function getDeviceTimezone() {
  try {
    const calendars = getCalendars();
    return calendars[0]?.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Europe/Paris';
  }
}

export function formatMatchTime(utcDate, timezone) {
  const date = new Date(utcDate);
  const zonedDate = utcToZonedTime(date, timezone);
  return format(zonedDate, 'HH:mm', { timeZone: timezone });
}

export function formatMatchDate(utcDate, timezone) {
  const date = new Date(utcDate);
  const zonedDate = utcToZonedTime(date, timezone);
  return format(zonedDate, 'EEEE d MMMM', { locale: fr, timeZone: timezone });
}

export function formatMatchDateTime(utcDate, timezone) {
  const date = new Date(utcDate);
  const zonedDate = utcToZonedTime(date, timezone);
  return format(zonedDate, 'EEEE d MMMM à HH:mm', { locale: fr, timeZone: timezone });
}
