use anchor_lang::prelude::*;

use crate::errors::*;
use crate::state::User;

#[derive(Accounts)]
pub struct DeleteUser<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut, close = signer)]
    pub user: Account<'info, User>,
}

pub fn delete_user(ctx: Context<DeleteUser>) -> Result<()> {
    let user: &mut User = &mut ctx.accounts.user;

    if *ctx.accounts.signer.key != user.authority {
        return Err(LineupError::Unauthorized.into());
    }

    Ok(())
}
