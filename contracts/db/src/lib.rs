#![no_std]
use ai_io::*;
use client_io::*;
use contract::*;
use db_io::*;
use escrow_io::*;
use gstd::{msg, prelude::*, ActorId};

gstd::metadata! {
    title: "SmartCube DataBase",
    handle:
        input: DBAction,
        output: DBOutput,
    state:
      output: Vec<Contract>,
}

#[derive(Default)]
pub struct Database {
    pub owner_id: ActorId,
    pub escrow_id: ActorId,
    pub ai_id: ActorId,
    pub contracts: Vec<Contract>,
}

static mut DATABASE: Option<Database> = None;

impl Database {
    pub fn set_owner_id(&mut self, id: ActorId) {
        self.owner_id = id;
    }

    pub fn set_escrow_id(&mut self, id: ActorId) {
        self.escrow_id = id;
    }

    pub fn set_ai_id(&mut self, id: ActorId) {
        self.ai_id = id;
    }

    pub fn add_contract(&mut self, contract: Contract) {
        assert_eq!(
            msg::source(),
            self.owner_id,
            "You are not authorized to upload"
        );

        self.contracts.push(contract);

        msg::reply(DBOutput::ContractAdded, 0)
            .expect("Error in reply to message DBOutput::ContractAdded");
    }

    pub fn update_contract(
        &mut self,
        id: ActorId,
        rate: i32,
        audited: bool,
        auditor_description: String,
        label: String,
    ) {
        assert_eq!(
            msg::source(),
            self.owner_id,
            "You are not authorized to upload"
        );
        let index: usize = find_contract(&self.contracts, &id);
        self.contracts[index].set_rate(rate);
        self.contracts[index].set_audited(audited);
        self.contracts[index].set_auditor_description(auditor_description);
        self.contracts[index].set_label(label);

        msg::reply(DBOutput::ContractUpdated, 0)
            .expect("Error in reply to message DBOutput::ContractUpdated");
    }

    pub fn set_contract_id(&mut self, id: ActorId) {
        assert_eq!(
            msg::source(),
            self.owner_id,
            "You are not authorized to upload"
        );
        let index: usize = self.contracts.len() - 1;
        self.contracts[index].set_id(id);

        msg::reply(DBOutput::ContractIDSet, 0)
            .expect("Error in reply to message DBOutput::ContractIDSet");
    }

    pub async fn upload_to_ai(&mut self, contract_id: &ActorId) {
        assert_eq!(
            msg::source(),
            self.owner_id,
            "You are not authorized to upload"
        );
        let index: usize = find_contract(&self.contracts, &contract_id);
        msg::send_for_reply_as::<_, AIOutput>(
            self.ai_id,
            AIAction::UpdateAI {
                contract: self.contracts[index].clone(),
            },
            0,
        )
        .expect("Error in sending a message `[AIAction::UpdateAI]` to ai contract")
        .await
        .expect("Unable to decode `AIAction`");
        msg::reply(DBOutput::ContractUploadedToAI, 0)
            .expect("Error in reply to message  DBAction::UploadToAI");
    }

    pub async fn upload_to_escrow(&mut self, contract_id: &ActorId) {
        assert_eq!(
            msg::source(),
            self.owner_id,
            "You are not authorized to upload"
        );
        let index: usize = find_contract(&self.contracts, &contract_id);
        msg::send_for_reply_as::<_, EscrowOutput>(
            self.escrow_id,
            EscrowAction::ContractUploaded {
                contract: self.contracts[index].clone(),
            },
            0,
        )
        .expect("Error in sending a message `[EscrowAction::ContractUploaded]` to escrow contract")
        .await
        .expect("Unable to decode `EscrowAction`");
        msg::reply(DBOutput::ContractUploadedToEscrow, 0)
            .expect("Error in reply to message  DBAction::UploadToEscrow");
    }
    pub async fn upload_to_client(&mut self, contract_id: &ActorId) {
        assert_eq!(
            msg::source(),
            self.owner_id,
            "You are not authorized to upload"
        );
        msg::send_for_reply_as::<_, ClientOutput>(
            self.client_id,
            ClientAction::IDRecived {
                id: contract_id.clone(),
            },
            0,
        )
        .expect("Error in sending a message `[ClientAction::IDRecived]` to escrow contract")
        .await
        .expect("Unable to decode `ClientAction`");
        msg::reply(DBOutput::ContractUploadedToClient, 0)
            .expect("Error in reply to message  DBAction::UploadToClient");
    }
}

fn find_contract(contracts: &Vec<Contract>, id: &ActorId) -> usize {
    contracts
        .iter()
        .position(|contract| contract.id == *id)
        .unwrap()
}

#[no_mangle]
extern "C" fn init() {
    let mut data_base: Database = Default::default();
    data_base.set_owner_id(msg::source());
    unsafe { DATABASE = Some(data_base) };
}

#[gstd::async_main]
async unsafe fn main() {
    let data_base = unsafe { DATABASE.get_or_insert(Default::default()) };
    let action: DBAction =
        msg::load().unwrap_or_else(|_| panic!("The DB Unable to decode Data Base Action"));

    match action {
        DBAction::AddContract { contract } => data_base.add_contract(contract),
        DBAction::UpdateContract {
            id,
            rate,
            audited,
            auditor_description,
            label,
        } => data_base.update_contract(id, rate, audited, auditor_description, label),
        DBAction::SetContractID { id } => data_base.set_contract_id(id),
        DBAction::UploadToAI { id } => data_base.upload_to_ai(&id).await,
        DBAction::UploadToEscrow { id } => data_base.upload_to_escrow(&id).await,
        DBAction::UploadToClient { id } => data_base.upload_to_client(&id).await,
    }
}

#[no_mangle]
pub unsafe extern "C" fn meta_state() -> *mut [i32; 2] {
    let data_base = DATABASE.get_or_insert(Default::default());
    let contracts: Vec<Contract> = data_base.contracts.clone();
    let encoded = contracts.encode();
    gstd::util::to_leak_ptr(encoded)
}
