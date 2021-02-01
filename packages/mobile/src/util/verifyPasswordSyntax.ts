export const verifyPasswordSyntax = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regex.test(String(password))
}
