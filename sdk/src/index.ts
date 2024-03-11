import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor'
import {
  Connection,
  PublicKey,
  TransactionMessage,
  VersionedTransaction
} from '@solana/web3.js'
import { IDL, LineupProtocol } from './types/lineup'
import { encodeString } from './utils/name'
import { getUserPDA } from './utils/helpers'

const LINEUP_PROGRAM_ID = 'F1fSaEwdEzaSMvFcoHSmiCEToY1HFBHjUGYmqJiGkn9X'

export default class Lineup {
  program: Program<LineupProtocol>
  provider: AnchorProvider
  connection: Connection
  wallet: Wallet

  constructor(connection: Connection, wallet: Wallet) {
    this.connection = connection
    this.wallet = wallet
    this.provider = new AnchorProvider(
      this.connection,
      this.wallet,
      AnchorProvider.defaultOptions()
    )
    this.program = new Program<any>(IDL, LINEUP_PROGRAM_ID, this.provider)
  }

  /**
   * Create a new User
   *  @param name User name
   *  @param bio bio name
   *  @param avatar Avatar name
   */
  createUser = async ({
    name,
    bio,
    avatar
  }: {
    name: string
    bio: string
    avatar: string
  }) => {
    const UserPDA = getUserPDA(this.wallet.publicKey, this.program.programId)

    const ix = await this.program.methods
      .createUser({
        name: encodeString(name),
        bio: bio,
        avatar: avatar
      })
      .accounts({
        signer: this.wallet.publicKey,
        user: UserPDA
      })
      .instruction()

    const { blockhash } = await this.connection.getLatestBlockhash()

    const message = new TransactionMessage({
      payerKey: this.wallet.publicKey,
      instructions: [ix],
      recentBlockhash: blockhash
    }).compileToV0Message()

    const signature = await this.wallet.signTransaction(
      new VersionedTransaction(message)
    )

    const hash = await this.connection.sendRawTransaction(signature.serialize())

    return hash
  }

  /**
   * Get User
   */
  getUser = async (address: PublicKey) => {
    const UserPDA = getUserPDA(address, this.program.programId)

    const user = this.program.account.user.fetch(UserPDA)

    return user
  }

  /**
   * Delete User
   */
  deleteUser = async (address: PublicKey) => {
    const UserPDA = getUserPDA(address, this.program.programId)

    const ix = await this.program.methods
      .deleteUser()
      .accounts({
        user: UserPDA,
        signer: this.wallet.publicKey
      })
      .instruction()

    const { blockhash } = await this.connection.getLatestBlockhash()

    const message = new TransactionMessage({
      payerKey: this.wallet.publicKey,
      instructions: [ix],
      recentBlockhash: blockhash
    }).compileToV0Message()

    const signature = await this.wallet.signTransaction(
      new VersionedTransaction(message)
    )

    const hash = await this.connection.sendRawTransaction(signature.serialize())

    return hash
  }
}
