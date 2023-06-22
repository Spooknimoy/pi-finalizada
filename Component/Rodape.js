import React from 'react';

const Rodape = () => {
  return (
    <>
      <footer  className='bg-success' style={{ width: '100%', bottom: '0' }}>
        <div style={{ color: 'white', padding: '10px', width: '100%', textAlign: 'center', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: 'bold' }}>
          57ª Legislatura - 1ª Sessão Legislativa Ordinária
        </div>
        <div style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <div style={{fontFamily:'Roboto', fontWeight: 'bold'}}>
              Câmara dos Deputados - Palácio do Congresso Nacional - Praça dos Três Poderes<br />
              Brasília - DF - Brasil - CEP 70160-900
            </div>
            <div style={{fontFamily:'Roboto', fontWeight: 'bold'}}>
              CNPJ: 00.530.352/0001-59 <br />
              Disque-Câmara: 0800-0-619-619, de 8h às 20h <br />
              Atendimento presencial: de 9h às 19h <br />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
          <a href="https://www2.camara.leg.br/sobre-o-portal" style={{ fontFamily: 'Arial, sans-serif', color: 'white', textDecoration: 'none' }}>   Sobre o Portal </a>  |
          <a href="https://www2.camara.leg.br/termo-de-uso-e-politica-de-privacidade" style={{ fontFamily: 'Arial, sans-serif', color: 'white', textDecoration: 'none' }}>   Termos de Uso </a>   |
          <a href="https://auth.camara.leg.br/auth/realms/redecamara/login-actions/authenticate?execution=0df0b3c6-416e-480e-b245-6dca2d59ce7d&client_id=clientes-CAS&tab_id=aZhGlzk9K4Y" style={{ fontFamily: 'Arial, sans-serif', color: 'white', textDecoration: 'none' }}>   Aplicativos Extranet </a>
        </div>
      </footer>
    </>
  );
};

export default Rodape;
