use anchor_lang::prelude::*;

use instructions::*;
use state::*;

mod errors;
mod instructions;
mod state;

declare_id!("F1fSaEwdEzaSMvFcoHSmiCEToY1HFBHjUGYmqJiGkn9X");

#[program]
pub mod lineup_protocol {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, args: CreateUserArgs) -> Result<()> {
        instructions::create_user(ctx, args)
    }

    pub fn delete_user(ctx: Context<DeleteUser>) -> Result<()> {
        instructions::delete_user(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
