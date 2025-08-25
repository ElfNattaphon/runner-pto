export async function getBcrypt() {
  const mod: any = await import('bcryptjs')
  return (mod && mod.hash) ? mod : (mod && mod.default ? mod.default : mod)
}
export async function hashPassword(password: string, saltRounds = 10) {
  const bcrypt = await getBcrypt()
  return await bcrypt.hash(password, saltRounds)
}
export async function comparePassword(password: string, hash: string) {
  const bcrypt = await getBcrypt()
  return await bcrypt.compare(password, hash)
}
