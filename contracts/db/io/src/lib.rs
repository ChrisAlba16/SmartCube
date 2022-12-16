#![no_std]
use codec::{Decode, Encode};
use contract::*;
use gstd::{prelude::*, ActorId};
use scale_info::TypeInfo;

#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum DBAction {
    AddContract {
        contract: Contract,
    },
    UpdateContract {
        id: ActorId,
        rate: i32,
        audited: bool,
        auditor_description: String,
        label: String,
    },
    SetContractID {
        id: ActorId,
    },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum DBOutput {
    ContractAdded,
    ContractUpdated,
    ContractIDSet,
}
