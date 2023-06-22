import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Link from 'next/link';
import Pagina3 from '@/Component/Pagina3';
import apiDeputados from '@/services/apiDeputados';
import Rodape from '@/Component/Rodape';


const DetalhesPartido = ({ partido, membros }) => {
  const cardTextStyle = {
    fontFamily: 'Arial, sans-serif', // Defina a fonte desejada
  };

  return (
    <>

    <Pagina3 titulo={partido.nome}>
      <Row>
        <Col className='me-5' md={3}>
          <Card className="mb-4 bg-success text-white">
            <Card.Img variant="top" src={partido.urlLogo} />
            <Card.Body>
              <Card.Title>{partido.nome}</Card.Title>
              <Card.Text style={cardTextStyle}>Criado: {partido.status.data}</Card.Text>
              <Card.Text style={cardTextStyle}>Partido: {partido.sigla}</Card.Text>
              <Card.Text style={cardTextStyle}>UF: {partido.status.lider.uf}</Card.Text>
              <Card.Text style={cardTextStyle}>Membros: {partido.status.totalMembros}</Card.Text>
              <Card.Text style={cardTextStyle}>Situação: {partido.status.situacao}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className='me-5' md={6}>
          <h1>Membros</h1>
          <Table striped bordered hover size="sm"  className="table-custom">
            <thead>
              <tr >
                <th >Sigla do Partido</th>
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
        <Col  className='me-2' md={2} >
          <Card className="mb-4 " style={{ marginTop: '35px' }}>
            <Card.Text>
             <Link href={'/deputados'}> <p className='text-center' style={cardTextStyle}> Líder do Partido <br/>
              {partido.status.lider.nome}</p></Link>
            </Card.Text>
            <Card.Img
              variant="top"
              className="rounded border border-dark d-block mx-auto"
              style={{
                width: '110px',
                height: '150px',
                marginTop: '10px',
              }}
              src={partido.status.lider.urlFoto}
            />
            <Card.Text></Card.Text>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Pagina3>

    <div style={{ height: '23rem' }}></div> 

    <Rodape></Rodape>
   </>
  );
};

export default DetalhesPartido;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const response = await apiDeputados.get(`/partidos/${id}`);
  const partido = response.data.dados;

  const lidresponse = await apiDeputados.get(`/partidos/${id}/membros`);
  const membros = lidresponse.data.dados;

  return {
    props: { partido, membros },
  };
}