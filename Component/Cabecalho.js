import React from 'react';
import { Nav } from 'react-bootstrap';

function Navbar() {
  const linkStyle = {
    color: 'white',
    fontSize: '14px',
    marginRight: '30px',
    textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(14, 40, 237, 0.96)',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '1px 3px 7px rgba(0,0,0,0.80)',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    marginTop: '5px',
    paddingRight: '10px',
    paddingLeft: '10px'
  };

  return (
    <Nav style={{
      backgroundColor: 'orange',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      zIndex: '999' // Ajuste o valor conforme necessário para sobrepor outros elementos
    }}>
      <div>
        <a href="#" style={linkStyle}>HOME</a>
      </div>
      <img src={'https://www.camara.leg.br/midias/image/2022/03/marca-camara-filete-preto.png'} alt="Logo" style={{ height: '30px', width: 'auto', marginTop: '10px', marginBottom: '10px' }} />
      <div style={{ marginLeft: '0.5rem' }}>
        <a href="#" style={linkStyle}>FAQ</a>
        <a href="#" style={{ ...linkStyle, marginRight: '0', textShadow: '1px 0 1px rgba(0,0,0,0.3)' }}>CONTATO</a>
      </div>
    </Nav>
  );
}

export default Navbar;