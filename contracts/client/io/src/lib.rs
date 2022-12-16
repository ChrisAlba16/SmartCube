#![no_std]
use codec::{Decode, Encode};
use gstd::ActorId;
use scale_info::TypeInfo;

#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum ClientAction {
    IDRecived { id: ActorId },
    ReputationUpdated { reputation: i32 },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum ClientOutput {
    IDRecived,
    ReputationUpdated,
}
