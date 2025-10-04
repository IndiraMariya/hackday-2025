export function score(me, other) {
  let s = 0;
  if (overlap(me.courses, other.courses)) s += 2;
  if (overlap(me.interests, other.interests)) s += 1;
  if (overlap(me.availability, other.availability)) s += 1;
  if (me.major && me.major === other.major) s += 1;
  if (me.year && me.year === other.year) s += 1;
  return s;
}

function overlap(a = [], b = []) {
  return a?.some(x => b?.includes(x));
}
