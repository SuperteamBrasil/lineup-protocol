use anchor_lang::prelude::*;

#[account]
pub struct User {
    pub ts: i64,
    pub name: [u8; 32],
    pub bump: u8,
    pub authority: Pubkey,
    pub avatar: String,
    pub bio: String,
    pub active_courses: i32,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateUserArgs {
    pub name: [u8; 32],
    pub avatar: String,
    pub bio: String,
}

impl User {
    pub const PREFIX_SEED: &[u8] = b"user";

    pub const SPACE: usize =
        // anchor descriminator + all static variables
        8 + std::mem::size_of::<Self>();
}
