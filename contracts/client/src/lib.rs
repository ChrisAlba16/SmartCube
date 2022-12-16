#![no_std]
use client_io::*;
use gstd::{ msg, prelude::*, ActorId};

gstd::metadata! {
    title: "SmartCube Client",
    handle:
        input: ClientAction,
        output: ClientOutput,
    state:
      output: Client,
}

#[derive(Clone, Debug, Encode, Decode, TypeInfo, Default, PartialEq, Eq)]
pub struct Client {
    pub id: ActorId,
    pub contract_id: Vec<ActorId>,
    pub reputation: i32,
}

static mut CLIENT: Option<Client> = None;

impl Client {
    pub fn set_id(&mut self, id:ActorId){
        self.id = id;
    }
    pub fn add_contract(&mut self, contract_id: ActorId) {
        self.contract_id.push(contract_id.clone());
    }
    pub fn add_reputation(&mut self, reputation: i32) {
        self.reputation = reputation.clone();
    }
}


#[no_mangle]
extern "C" fn init() {
    let mut client: Client = Default::default();
    client.set_id(msg::source());
    unsafe { CLIENT = Some(client) };
}

#[gstd::async_main]
async unsafe fn main() {
    let client = unsafe { CLIENT.get_or_insert(Default::default()) };
    let action: ClientAction =
        msg::load().unwrap_or_else(|_| panic!("The Client was Unable to decode Client Action"));

    match action {
        ClientAction::IDRecived { id } => client.add_contract(id),
        ClientAction::ReputationUpdated { reputation } => client.add_reputation(reputation)
    }
}

#[no_mangle]
pub unsafe extern "C" fn meta_state() -> *mut [i32; 2] {
    let client = CLIENT.get_or_insert(Default::default());
    let mut clients: Vec<Client> = Vec::new();
    clients.push(client.clone());
    let encoded = clients.encode();
    gstd::util::to_leak_ptr(encoded)
}
