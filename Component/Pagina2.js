import { Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { Container } from 'react-bootstrap';

const Pagina = (props) => {
  return (
    <>
      <div className='bg-success text-white py-3 text-center mb-3'>
        <div style={{ display: 'flex', marginTop: '2px' }}>

          <Button  style={{ marginLeft: '3rem', padding: '0px 30px', fontFamily: 'inherit', fontWeight: 'bold', }}

            size="small" color='success' variant="contained">
              

            <Link className='text-white'  style={{ textDecoration: 'none' }} href='/deputados'>Voltar</Link>

          </Button>

          <style jsx>{`
            h1 {
              font-family: Georgia;
            }
          `}</style>
          <h1 style={{ marginLeft: '35%' }}>{props.titulo}</h1>


          <img style={{ width: '50px', height: 'auto' }} src='https://i.im.ge/2023/06/18/iYHdQr.logo.png' />
        </div>
      </div>

      <Container className='mb-5'>
        {props.children}
      </Container>
    </>
  )
}

export default Pagina;
