use anchor_lang::prelude::*;

#[error_code]
pub enum LineupError {
    #[msg("Invalid account")]
    InvalidAccount,

    #[msg("Unauthorized access")]
    Unauthorized,
}
