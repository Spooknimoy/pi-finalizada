import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Cabecalho from './Cabecalho'
import { Container } from 'react-bootstrap';


const Pagina = () => {

    const estiloBackground = {
        background: 'rgba(14, 40, 237, 0.96)',
        height: '40vh',
        width: '100%'
    }


    const estilotitulo = {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '3rem', 
        fontWeight: 'bold',
        paddingRight: '15vh',
        marginTop: '2rem' 
    }

    const estilotexto = {
        color: 'rgba(255, 255, 255, 0.8)',
        paddingRight: '15vh',
        fontSize: '1rem'
    }

    const mulher22 = {
        width: '50vh',
        height: '48.3vh',
        loading: "lazy",
       
    }

    const texto = {
        marginBottom: '8vh'
    }

    return (
        <>
            <Cabecalho />
            <div style={estiloBackground}>
                <Container className="d-flex flex-row-reverse align-items-center">
                    <img style={mulher22} src='https://i.im.ge/2023/05/18/UnrnXz.m.png' alt="Descrição da imagem"  title='Imagem da api'/>
                    <div className="" style={texto}>
                        <h1 style={estilotitulo}>Dados abertos</h1>
                        <p style={estilotexto}>Se você precisa de dados selecionados, um pouco de cada vez, conheça e experimente aqui mesmo a nova API RESTful, suas URLs para acesso aos dados, seus parâmetros de busca e as estruturas de dados retornadas.</p>

                           <p style={estilotexto}> Se você prefere fazer download de conjuntos completos (e grandes) de dados de uma só vez, para selecionar e processar no seu computador, visite a seção de Arquivos e escolha o formato mais apropriado para você.


                        </p>

                        <p style={estilotexto}><strong>Bom trabalho e divirta-se!</strong></p>
                    </div>
                </Container>
            </div>
          
        </>
    )
}

export default Pagina;