import Pagina2 from '@/Component/Pagina2';
import apiDeputados from '@/services/apiDeputados'; 
import { Card, Col, Row } from 'react-bootstrap'; 
import { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; 

// Componente Chart, responsável por renderizar o gráfico de barras
const Chart = ({ data }) => {
  return (
    <BarChart width={1250} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" /> {/* Exibe um grid no gráfico */}
      <XAxis dataKey="nome" /> {/* Define o eixo X do gráfico */}
      <YAxis /> {/* Define o eixo Y do gráfico */}
      <Tooltip /> {/* Exibe informações em um tooltip ao passar o mouse sobre as barras */}
      <Legend /> {/* Exibe uma legenda para as barras */}
      <Bar dataKey="membros" fill="#4c944c" /> {/* Define os dados e cor das barras */}
    </BarChart>
  );
};

// Componente principal, chamado de Index
const Index = () => {
  const [partidos, setPartidos] = useState([]); // Define o estado 'partidos' e a função 'setPartidos' para atualizá-lo

  useEffect(() => {
    // Função assíncrona para buscar os dados dos partidos
    const fetchPartidos = async () => {
      const response1 = await apiDeputados.get('/partidos/?pagina=1'); // Faz uma requisição à API para buscar os partidos da página 1
      const response2 = await apiDeputados.get('/partidos/?pagina=2'); // Faz uma requisição à API para buscar os partidos da página 2

      const partidos1 = response1.data.dados; // Obtém os dados dos partidos da página 1
      const partidos2 = response2.data.dados; // Obtém os dados dos partidos da página 2

      const combinedPartidos = [...partidos1, ...partidos2]; // Combina os arrays de partidos em um único array

      // Faz uma chamada à API para obter informações adicionais de cada partido
      const partidosComFoto = await Promise.all(
        combinedPartidos.map(async (partido) => {
          const partidoDetalhes = await apiDeputados.get(`/partidos/${partido.id}`); // Busca os detalhes do partido usando o ID
          const fotoPartido = partidoDetalhes.data.dados.urlLogo; // Obtém a URL do logotipo do partido
          const membrosPartido = partidoDetalhes.data.dados.status.totalMembros; // Obtém o total de membros do partido
          return { ...partido, membros: membrosPartido, urlFoto: fotoPartido }; // Retorna um objeto com as informações do partido
        })
      );

      setPartidos(partidosComFoto); // Atualiza o estado 'partidos' com os partidos que possuem informações adicionais
    };

    fetchPartidos(); // Chama a função para buscar os dados dos partidos assim que o componente é montado
  }, []); // O segundo argumento vazio indica que este efeito deve ser executado apenas uma vez, quando o componente é montado

  const [hoveredId, setHoveredId] = useState(null); // Define o estado 'hoveredId' e a função 'setHoveredId' para atualizá-lo

  const handleHover = (id) => {
    setHoveredId(id); // Atualiza o estado 'hoveredId' quando o mouse entra em um cartão
  };

  const handleMouseLeave = () => {
    setHoveredId(null); // Reseta o estado 'hoveredId' quando o mouse sai de um cartão
  };

  return (
    <Pagina2 titulo="Partidos"> {/* Renderiza o componente Pagina2 com o título "Partidos" */}
      <h2>Grafico de membros</h2> 
      <Chart data={partidos} /> {/* Renderiza o gráfico de membros passando os dados dos partidos */}
      <Row md={1} style={{ listStyleType: 'none' }}>
        {partidos.map((item) => (
          <Col key={item.id}>
            <Card
              className="mb-4"
              style={{
                transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={() => handleHover(item.id)} // Define o evento onMouseEnter para atualizar o estado 'hoveredId'
              onMouseLeave={handleMouseLeave} // Define o evento onMouseLeave para resetar o estado 'hoveredId'
            >
              <Link href={`/partidos/${item.id}`} style={{ textDecoration: 'none' }}> {/* Define um link para cada cartão */}
                <div>
                  <Card.Img
                    style={{ width: '15rem' }}
                    variant="top"
                    src={item.urlFoto || 'https://cdn.discordapp.com/attachments/925177373261983765/1121291895012872192/erro.png'} // Define a URL da imagem do partido ou uma imagem de erro caso não exista
                    onError={(e) => {
                      e.target.src = 'https://cdn.discordapp.com/attachments/925177373261983765/1121291895012872192/erro.png'; // Define uma imagem de erro caso ocorra um erro ao carregar a imagem do partido
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      backgroundColor: hoveredId === item.id ? 'blue' : 'transparent', // Define a cor de fundo do elemento dependendo do estado 'hoveredId'
                    }}
                  ></div>
                  <Card.Body>
                    <Card.Title className="text-dark" style={{ fontFamily: 'Roboto' }}>
                      {item.nome} {/* Exibe o nome do partido */}
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
