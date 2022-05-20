import React from 'react'
import TableComponent from './TableComponent'
import records from '../DB/DB.json'
import Navigationbar from './Navigationbar'

export default function HomePage() {
    return (
        <>
     {/* <Navigationbar/> */}

        <div style={{ marginTop: "3rem", marginLeft: "7%" }}>

            <TableComponent search={true} Data={records}/>
        </div>
        </>
    )
}


