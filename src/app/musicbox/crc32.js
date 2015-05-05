/**
 * Created by lingwanwangluo on 15/5/4.
 */

function crc32(e) {
  var t, r, n, a = new Array(256);
  for (t = 0; 256 > t; t++) {
    for (n = t, r = 0; 8 > r; r++) n = 1 & n ? n >> 1 & 2147483647 ^ 3988292384 : n >> 1 & 2147483647;
    a[t] = n
  }
  for ("string" != typeof e && (e = "" + e), n = 4294967295, t = 0; t < e.length; t++) n = n >> 8 & 16777215 ^ a[255 & n ^ e.charCodeAt(t)];
  return n ^= 4294967295,
    (n >> 3).toString(16)
};
