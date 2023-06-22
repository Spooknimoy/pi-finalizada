import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Pagina3 from '@/Component/Pagina3';
import apiDeputados from '@/services/apiDeputados';
import Rodape from '@/Component/Rodape';

const DetalhesOrgao = ({ orgao, membros, eventos, votacao }) => {


  return (

    <>
    <Pagina3 titulo={orgao.sigla}>
      <Row>
        <Col md={3}>
          <Card className="mb-4 m">
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>{orgao.nome}</Card.Title>
              <Card.Text>Data : {orgao.dataInstalacao}</Card.Text>
              <Card.Text>Sigla: {orgao.sigla}</Card.Text>
              <Card.Text>tipo de orgao: {orgao.tipoOrgao}</Card.Text>
              <Card.Text>Apelido: {orgao.apelido}</Card.Text>
              <Card.Text>Nome da Publicação: {orgao.nomePublica}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h1 style={{fontFamily: 'Robooto'}}>Membros</h1>
          <Table striped bordered hover size="sm" >
            <thead>
              <tr>
                <th>Sigla do Partido</th>
                <th>Nome</th>
                <th>UF</th>
              </tr>
            </thead>
            <tbody>
              {membros.map((item, index) => (
                <tr key={index}>
                  <td>{item.siglaPartido}</td>
                  <td>{item.nome}</td>
                  <td>{item.siglaUf}</td>
                </tr>
              ))}
            </tbody>


          </Table>
        </Col>
        <Col md={3} >
          <Card className="mb-" style={{marginTop: '35px'}}>
            <Card.Title className='ms-2' style={{fontSize: '2.3rem', fontFamily: 'Robooto'}}>Locais</Card.Title>
            <Card.Text >
            {eventos.map((item) => (
              <p style={{fontFamily: 'fantasy'}} className='ms-2'>  {item.localCamara.nome}</p>
              ))}
            </Card.Text>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Pagina3>

    <div style={{ height: '23rem' }}></div> 



      <Rodape className=''></Rodape>

    
</>
  );
};

export default DetalhesOrgao;

export async function getServerSideProps(context) {
  
  const id = context.params.id
  
  const org = await apiDeputados.get('/orgaos/' + id)
  const orgao = org.data.dados
  
  const or = await apiDeputados.get('/orgaos/' + id + '/membros' )
  const membros = or.data.dados
  
    const o = await apiDeputados.get('/orgaos/' + id + '/eventos' )
    const eventos = o.data.dados

    const vo = await apiDeputados.get('/orgaos/' + id + '/votacoes' )
    const votacao = vo.data.dados
    
    
    return {
      props: { orgao, membros, eventos, votacao },
    }
  }