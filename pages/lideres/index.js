import Pagina2 from '@/Component/Pagina2';
import apiDeputados from '@/services/apiDeputados';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Index = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchPartidos = async () => {
      const response1 = await apiDeputados.get('/partidos/?pagina=1');
      const response2 = await apiDeputados.get('/partidos/?pagina=2');

      const partidos1 = response1.data.dados;
      const partidos2 = response2.data.dados;

      const combinedPartidos = [...partidos1, ...partidos2];

      // Atualize os detalhes de cada partido com a URL da foto do líder
      const partidosComFotoLideres = await Promise.all(
        combinedPartidos.map(async (partido) => {
          const lideresResponse = await apiDeputados.get(`/partidos/${partido.id}/lideres`);
          const lideresPartido = lideresResponse.data.dados;
          const fotoLiderPartido = lideresPartido[0]?.urlFoto; // Obtém a foto do primeiro líder (se houver)
          return { ...partido, urlFotoLider: fotoLiderPartido };
        })
      );

      setPartidos(partidosComFotoLideres);
    };

    fetchPartidos();
  }, []);

  const [hoveredId, setHoveredId] = useState(null);

  const handleHover = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <Pagina2 titulo="Lideres">
     <Row md={6} style={{ listStyleType: 'none' }}>
        {partidos.map((item) => (
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
                    <Link  style={{textDecoration: 'none'}} href={`/partidos/${item.id}`}>
                  <div>
                    <Card.Img variant="top" src={item.urlFotoLider || 'https://i.im.ge/2023/06/22/if44tc.erro.png'} />
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
                      <Card.Title className='text-dark' style={{ fontFamily: 'Robooto' }}>
                        {item.nome}
                      </Card.Title>
                      
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

export default Index;