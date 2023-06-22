import Pagina from '@/Component/Pagina';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import apiDeputados from '@/services/apiDeputados';
import { Avatar, Button } from '@mui/material';
import { useRouter } from 'next/router';
import SendIcon from '@mui/icons-material/Send';

const index = ({ deputados }) => {
  
  const columns = [
    {
      headerName: '#',
      cellRendererFramework: (params) => (
        <Avatar alt={params.data.nome} src={params.data.avatar} sx={{ width: 39, height: 39, border: '1px solid black' }} />
      ),
      filter: false,
    },
    {
      headerName: 'Name',
      field: 'nome',
      checkboxSelection: true,
    },
    {
      headerName: 'Partido',
      field: 'Partido',
    
    },
    {
      headerName: 'UF',
      field: 'uf',
    },
    {
      headerName: 'E-mail',
      field: 'Email',
    },
    {
      headerName: '',
      field: 'button',
      filter: false,
      cellRendererFramework: (params) => {
        const router = useRouter();
        const handleClick = () => {
          router.push(`/deputados/${params.data.id}`);
        };
        return (
          <Link href={`/deputados/${params.data.id}`}>
            <Button variant="outlined" size="small" style={{ padding: '4px 8px' }} endIcon={<SendIcon />} onClick={handleClick}>
              ENVIAR
            </Button>
          </Link>
        );
      },
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true || '#',
  };

  const subli = {
    textDecoration: 'none',
  };

  const rowData = deputados.map((deputado) => ({
    id: deputado.id, // Adicione o campo "id" do deputado
    nome: deputado.nome,
    Partido: deputado.siglaPartido,
    avatar: deputado.urlFoto,
    Email: deputado.email,
    uf: deputado.siglaUf,
  }));

  return (<>
    <Pagina />
    <Container>

      <Nav variant="tabs" defaultActiveKey="/home" className='mt-4'>
        <Nav.Item>
          <Nav.Link href="/deputados/deputs">Deputados</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/partidos">Partidos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/lideres">Lideres</Nav.Link>
        </Nav.Item>

      </Nav>
    </Container>

    <Container>
      <p className='mt-3'>
        <strong>Versão: 0.4.80 - 05/10/2023 04:52 PM </strong>- confira o que mudou na{' '}
        <Link href='https://dadosabertos.camara.leg.br/news/noticias.html' style={subli}>
          página de Notícias
        </Link>
      </p>

      <p>
        Bem vindo à nova versão do serviço <strong>Dados Abertos</strong> da Câmara dos Deputados!
      </p>
      <p>
        Esta versão pode entregar dados puros em formatos JSON e XML, e tenta se aderir ao máximo à
        arquitetura REST
      </p>
      <p>
        Nesta página você pode conhecer e experimentar as URLs de acesso aos dados, os parâmetros de
        query string que podem ser aplicados para filtrar e selecionar resultados, e as estruturas de
        dados que são retornadas.
      </p>
      <p>Além do método HTTP GET, você também pode usar o método HEAD com qualquer dos serviços.</p>
      <p>
        Por padrão, todos os serviços de listagens retornam 15 itens, e o limite por requisição é de
        100 itens.
      </p>
      <p>
        <strong>ATENÇÃO: </strong>Esta versão é ainda incompleta, sujeita a mudanças e não substitui a{' '}
        <Link href='https://www2.camara.leg.br/transparencia/dados-abertos/dados-abertos-legislativo' style={subli} >
          versão original do <strong>Dados Abertos</strong>
        </Link>
        . Caso você encontre problemas ou queira dar sugestões, por favor entre em{' '}
        <Link style={subli} href='https://dadosabertos.camara.leg.br/contact/contact.html'>contato.</Link>
      </p>
    </Container>

    <Container className='mt-5'>
      <div
        className="ag-theme-alpine"
        style={{
          height: '35.2rem',
          width: '100%',
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
        /> 

      </div>

    </Container>
  



  </>)
}

export default index

export async function getServerSideProps(context) {
  const respDeputados = await apiDeputados.get('/deputados');
  const deputados = respDeputados.data.dados;

  return {
    props: { deputados },
  };
}