async function getBcrypt() {
  const mod = await import('bcryptjs');
  return mod && mod.hash ? mod : mod && mod.default ? mod.default : mod;
}
async function hashPassword(password, saltRounds = 10) {
  const bcrypt = await getBcrypt();
  return await bcrypt.hash(password, saltRounds);
}
async function comparePassword(password, hash) {
  const bcrypt = await getBcrypt();
  return await bcrypt.compare(password, hash);
}

export { comparePassword as c, hashPassword as h };
//# sourceMappingURL=bcrypt.mjs.map
