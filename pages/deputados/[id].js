import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Link from 'next/link';
import Pagina2 from '@/Component/Pagina2';
import apiDeputados from '@/services/apiDeputados';
import { Chart as chartjs, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, RadialLinearScale, BarElement } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Rodape from '@/Component/Rodape';

chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  RadialLinearScale,
  BarElement
);

const Detalhes = ({ deputado, todasdespesas, profissoes, orgao }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYears, setSelectedYears] = useState('');
    const [valoresDespesas, setValoresDespesas] = useState([]);
    const [datasDespesas, setDatasDespesas] = useState([]);
  
    todasdespesas.sort((a, b) => new Date(a.dataDocumento) - new Date(b.dataDocumento));

    useEffect(() => {
      updateChart();
    }, [selectedMonth]);
  
    const updateChart = () => {
      const filteredValoresDespesas = todasdespesas
        .filter((item) => item.dataDocumento.includes(`-${selectedMonth}-`))
        .map((item) => item.valorDocumento);
  
      const filteredDatasDespesas = todasdespesas
        .filter((item) => item.dataDocumento.includes(`-${selectedMonth}-`))
        .map((item) => item.dataDocumento);
  
      setValoresDespesas(filteredValoresDespesas);
      setDatasDespesas(filteredDatasDespesas);
    };
  
    const data = {
      labels: datasDespesas,
      datasets: [{
        data: valoresDespesas,
        backgroundColor: 'orange',
        borderColor: 'blue',
        hoverOffset: 10
      }]
    };
  
    const option = {};
  
    const handleMonthChange = (e) => {
      setSelectedMonth(e.target.value);
    };
  
    const filteredDespesas = selectedMonth
      ? todasdespesas.filter((item) =>
          item.dataDocumento.includes(`-${selectedMonth}-`)
        )
      : todasdespesas;
  return (
    <>
      <Pagina2 titulo={deputado.ultimoStatus.nome}>
        <Row className="img-fluid">
          <Col md={6}>
            <Card className="mb-4" style={{ width: '20rem' }}>
              <Card.Img
                variant="top"
                key={deputado.id}
                src={deputado.ultimoStatus.urlFoto}
                style={{ backgroundPosition: 'right' }}
                className="img-fluid"
              />
              <Card.Body style={{ fontSize: '17px' }}>
                <Card.Title>{deputado.ultimoStatus.nome}</Card.Title>
              
                  <Card.Text>Partido: {deputado.ultimoStatus.siglaPartido}</Card.Text>
              
                <Card.Text>UF Partido: {deputado.ultimoStatus.siglaUf}</Card.Text>
                <Card.Text>@: {deputado.ultimoStatus.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <img
              style={{ width: '60rem', marginTop: '1rem' }}
              src="https://www.gov.br/planalto/pt-br/conheca-a-presidencia/acervo/simbolos-nacionais/brasao-da-republica/brasaooficialcolorido.png"
            ></img>
          </Col>
        </Row>
        <Row>
        <Col md={9} className="pe-0 bg-dark">
            <h1 className="bg-dark text-white mb-0 me-0">Despesas</h1>
            <div className="mb-3">
              <label htmlFor="monthInput" className="form-label">Digite o mês (número):</label>
              <input
                type="number"
                className="form-control"
                id="monthInput"
                value={selectedMonth}
                onChange={handleMonthChange}
                placeholder='Coloque o mês de 2023 a partir do mês 02 até o mês atual ...'
              />
            </div>
            <Table variant="dark" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {todasdespesas
                  .filter((item) =>
                    selectedMonth ? item.dataDocumento.includes(`-${selectedMonth}-`) : true,
                    selectedYears ? item.dataDocumento.includes(`-${selectedMonth}-`) : true
                  )
                  .map((item, lista) => (
                    <tr key={lista}>
                      <td>{item.dataDocumento}</td>
                      <td>{item.tipoDespesa}</td>
                      <td
                        style={{
                          color:
                            item.valorDocumento >= 6000
                              ? 'red'
                              : item.valorDocumento < 2000
                              ? 'green'
                              : 'orange',
                        }}
                      >
                        {item.valorDocumento}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          <Col md={3} className="bg-dark text-white text-center ms-0">
            <h1 className="mt-5" style={{ fontFamily: 'fantasy' }}>
              Profissões
            </h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {profissoes.map((item, index) => (
                <li key={index}>{item.titulo}</li>
              ))}
            </ul>
            <h1 className="mt-5" style={{ fontFamily: 'fantasy' }}>
              Orgão
            </h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {orgao.map((item, index) => (
                <Link key={index} href={'/orgao/' + item.idOrgao}>
                  <li className="text-white">{item.siglaOrgao}</li>
                </Link>
              ))}
            </ul>
          </Col>
        </Row>
        <h1 className="mt-5 text-center mb-5" style={{ fontFamily: 'Robooto' }}>
          Veja o gráfico a seguir
        </h1>
        <Row style={{ display: 'flex' }}>
          <Col md={6} className="p-0" style={{ width: '60rem', height: 'auto', marginLeft: '20px', marginTop: '5rem' }}>
            <Line data={data} options={option}></Line>
          </Col>
          <Col className="p-0" md={3} style={{}}>
            <img className="p-0" src="https://i.im.ge/2023/06/18/icidCX.mulher-grafico.png" style={{ width: '28rem', height: 'auto', marginTop: '9rem' }}></img>
          </Col>
        </Row>
      </Pagina2>
      <Rodape></Rodape>
    </>
  );
};

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const dep = await apiDeputados.get('/deputados/' + id);
  const deputado = dep.data.dados;

  const desp = await apiDeputados.get('/deputados/' + id + '/despesas?pagina=2&itens=500&ordenarPor=ano');
  const despesas = desp.data.dados;

  const despe = await apiDeputados.get('/deputados/' + id + '/despesas?pagina=1&itens=500&ordenarPor=mes');
  const despesas2 = despe.data.dados;

  const todasdespesas = [...despesas, ...despesas2];

  const prof = await apiDeputados.get('/deputados/' + id + '/profissoes');
  const profissoes = prof.data.dados;

  const org = await apiDeputados.get('/deputados/' + id + '/orgaos');
  const orgao = org.data.dados;

  return {
    props: { despesas, todasdespesas, deputado, profissoes, orgao },
  };
}
