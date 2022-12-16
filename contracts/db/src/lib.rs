#![no_std]
use contract::*;
use db_io::*;
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
    pub client_id: ActorId,
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
    }
}

#[no_mangle]
pub unsafe extern "C" fn meta_state() -> *mut [i32; 2] {
    let data_base = DATABASE.get_or_insert(Default::default());
    let contracts: Vec<Contract> = data_base.contracts.clone();
    let encoded = contracts.encode();
    gstd::util::to_leak_ptr(encoded)
}
