import { useState } from 'react';
import { useApi } from '@gear-js/react-hooks';
import { ADDRESS } from 'consts';
import { dbMetaWasm } from 'assets/wasm';
import {
  Message,
} from 'types';

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// Get messages on channel page
async function useMessages() {
  const { api } = useApi();
  const buffer = await fetch(dbMetaWasm)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => Buffer.from(arrayBuffer))
  const res = await api.programState.read(ADDRESS.DATABASE_CONTRACT, buffer).then((state) => state.toHuman());

  return { res };

}

function Home() {
  return (
    <>
     <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>IA</Button>
      <Button>RECLAMOS</Button>
      <Button>SUBIR CONTRATOS</Button>
      <Button>AUDITAR CONTRATOS</Button>
      <Button>LISTA DE CONTRATOS</Button>
      <Button>USAR CONTRATOS</Button>
      <Button>TODOS LOS CONTRATOS</Button>
    </ButtonGroup>
    </>
  )
}

export { Home };
