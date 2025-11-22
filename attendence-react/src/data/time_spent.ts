/**
 * Calculates the difference between two 24-hour clock strings.
 * Accepts either “H:MM” or “HH:MM”.
 * Returns "HH:MM" (hours and minutes).
 * Throws only if the format is fundamentally wrong or end ≤ start.
 */
export function calculateTimeSpent(startTime: string, endTime: string): string {
  const parse = (s: string): number => {
    // allow 1-2 digit hour, optional leading zero
    const m = s.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) throw new Error('Time must be "H:MM" or "HH:MM"');
    const h = Number(m[1]);
    const min = Number(m[2]);
    if (h > 23 || min > 59) throw new Error('Invalid time');
    return h * 60 + min; // total minutes
  };

  const startMin = parse(startTime);
  const endMin = parse(endTime);

  if (endMin <= startMin) throw new Error('End time must be after start time');

  const diff = endMin - startMin;
  const hh = Math.floor(diff / 60);
  const mm = diff % 60;

  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

// /* ---- demo ---- */
// console.log(calculateTimeSpent('9:00', '18:00'));  // "09:00"
// console.log(calculateTimeSpent('09:15', '17:45')); // "08:30"