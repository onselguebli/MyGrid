import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Grid, Button } from '@material-ui/core';
import FormDialog from '../aggrid/dialog';
import Navbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/Footer';
import "./aggrid.css"

const App = () => {
  const initialvalue = { id_grille: "", nom_grille: "", taille_grille: "", couleur_fond_grille: "" };
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [gridApi, setGridApi] = useState(null);
  const [tableData, settableData] = useState(null); // Set rowData to Array of Objects, one Object per Row
  const url = "http://localhost:4000/api/Grid_masters"
  const [formData, setformData] = useState(initialvalue);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setformData(initialvalue);
  };


  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "id_grille", field: 'id_grille', filter: true },
    { headerName: "nom_grille", field: 'nom_grille', filter: true },
    { headerName: "taille_grille", field: 'taille_grille', filter: true },
    { headerName: "couleur_fond_grille", field: 'couleur_fond_grille', filter: true },
    {
      headerName: "Actions", field: "id_grille", cellRendererFramework: (params) => <div >
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>modifier</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>supprimer</Button>
      </div>
    }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    floatingFilter: true,
    flex: 1
  }));


  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);


  useEffect(() => {
    getUsers();
  }, [])


  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => settableData(resp))

  }

  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setformData({ ...formData, [id]: value })
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json",
          mode: 'no-cors'
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json",
          mode: 'no-cors'
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setformData(oldData)
    handleClickOpen()
  }

  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Avez vous sure, voulez-vous supprimer ce grille", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "delete" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }

  const onGridReady = (params) => {
    console.log("grid is ready");
    setGridApi(params)
    /*fetch("http://localhost:4000/api/Grid_masters/").then(Resp=>Resp.json())
     .then(resp=>params.api.applyTransaction({add:resp}))//add new data to grid*/
  }

  return (
    <div >
      <Navbar/>
      {/* Example using Grid's API */}
      <div className='aggrid'>
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 1200, height: 1200 }}>

        <Grid align="right">
          <Button variant="contained" color="primary" onClick={handleClickOpen} >Ajouter utilisateur</Button>
        </Grid>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API

          rowData={tableData} // Row Data for Rows
          onGridReady={onGridReady}
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
        //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
        </div>
      </div>
      <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
      <Footer/>
    </div>
  );
};

export default App;


// Example load data from sever
/*useEffect(() => {
  fetch('https://www.ag-grid.com/example-assets/row-data.json')
  .then(result => result.json())
  .then(tableData => settableData(tableData))
}, []);*/

 // Example of consuming Grid Event
/*const cellClickedListener = useCallback( event => {
  console.log('cellClicked', event);
  
}, []);*/
