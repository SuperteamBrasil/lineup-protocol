import { PublicKey } from '@solana/web3.js'

export const getUserPDA = (address: PublicKey, programId: PublicKey) => {
  const [ProjectPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('user'), address.toBuffer()],
    programId
  )

  return ProjectPDA
}
