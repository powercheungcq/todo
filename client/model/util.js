const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  err.message = msg
  return err
}
export { createError }
