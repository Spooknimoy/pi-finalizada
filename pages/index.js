import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import apiDeputados from '@/services/apiDeputados';


const Table = ({ deputados }) => {



    const columns = [
        {
            headerName: 'Name',
            field: 'nome',
            checkboxSelection: true
        },
        {
            headerName: 'Age', field: 'age'
        }
    ]
    const defaultColDef = {
        sortable: true, editable: true, filter: true

    }
    return (


        <div className='ag-theme-alpine '
            style={{
                height: '250px',
                width: '600px'
            }}>


            <AgGridReact rowData={deputados.map(deputado => ({ nome: deputado.nome }))} columnDefs={columns} defaultColDef={defaultColDef} />


        </div>
    )
}

export default Table
export async function getServerSideProps(context) {

    const respDeputados = await apiDeputados.get('/deputados')
    const deputados = respDeputados.data.dados

    return {
        props: { deputados },
    }
}