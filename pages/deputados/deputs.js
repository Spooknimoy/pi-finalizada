import Pagina2 from '@/Component/Pagina2'
import apiDeputados from '@/services/apiDeputados'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const index = ({ deputados }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const handleHover = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <Pagina2 titulo='Deputados'>
      <Row md={6} style={{ listStyleType: 'none' }}>
        {deputados.map(item => (
          <Col key={item.id}>
            <Card
              className='mb-4'
              style={{
                transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={() => handleHover(item.id)}
              onMouseLeave={handleMouseLeave}
            >
                <Link style={{textDecoration: 'none'}} href={'/deputados/' + item.id}>
                <div>
                  <Card.Img variant="top" src={item.urlFoto || '/component/imagens/404.png'} />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      backgroundColor: hoveredId === item.id ? 'blue' : 'transparent',
                    }}
                  ></div>
                  <Card.Body>
                    <Card.Title className='text-dark' style={{ fontFamily: 'Robooto',}}>
                      {item.nome}
                    </Card.Title>
                    <Card.Text className='text-dark' style={{ fontFamily: 'Robooto', }}>
                      Partido: {item.siglaPartido}
                    </Card.Text>
                    <Card.Text className='text-dark' style={{ fontFamily: 'Robooto',  }}>
                      UF Partido: {item.siglaUf}
                    </Card.Text>
                  </Card.Body>
                </div>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina2>
  );
};

export default index;

export async function getServerSideProps(context) {
  const imagens = await apiDeputados.get('/deputados')
  const deputados = imagens.data.dados

  return {
    props: { deputados },
  }
}
