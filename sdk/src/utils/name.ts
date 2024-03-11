const MAX_NAME_LENGTH = 32

export const encodeString = (value: string): number[] => {
  if (value.length > MAX_NAME_LENGTH) {
    throw Error(`Vaulue (${value}) longer than 32 characters`)
  }

  const buffer = Buffer.alloc(32)
  buffer.fill(value)
  buffer.fill(' ', value.length)

  return Array(...buffer)
}

export const decodeString = (bytes: number[]): string => {
  const buffer = Buffer.from(bytes)
  return buffer.toString('utf8').trim()
}
