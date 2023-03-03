import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
//import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Grid, Button } from '@material-ui/core';
import FormDialog from '../aggrid/dialog';
import Navbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/Footer';
import "./aggrid.css"
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("CompanyName=EvaluationKey,LicensedGroup=Multi,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-0,ExpiryDate=13_March2023[v2]_MTY3ODY2NTYwMDAwMA==bdcda07fe581ca15b2a010bbef2b2513");
const App = () => {
 
  const initialvalue = { id_grille:"",nom_grille: "", taille_grille: "", couleur_fond_grille: "",id_col:"" };
  const initialvalue_colonne={id_colonne:"",nom_colonne:"",largeur_colonne:"",couleur_colonne:""};
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [gridApi, setGridApi] = useState(null);
  const [tableData, settableData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [tablData, settablData] = useState();
  const url = "http://localhost:4000/api/Grid_masters"
  const [formData, setformData] = useState(initialvalue);
  const[formData_colonne,setformData_colonne]=useState(initialvalue_colonne)
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
    { headerName: "id_grille", field: 'id_grille', cellRenderer: 'agGroupCellRenderer' },
    { headerName: "nom_grille", field: 'nom_grille' },
    { headerName: "taille_grille", field: 'taille_grille' },
    { headerName: "couleur_fond_grille", field: 'couleur_fond_grille' },
    {
      headerName: "Actions", field: "id_grille", cellRendererFramework: (params) => <div >
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>modifier</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>supprimer</Button>
      </div>
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    floatingFilter: true,
    flex: 1,
    enableRangeSelection: true,
    enableFillHandle: true,
     resizable: true,
    
  }),[]);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'nom_colonne' },
          { field: 'largeur_colonne', minWidth: 150 },
          { field: 'couleur_colonne' },
        ],
        defaultColDef: {
          flex: 1,
          rowSelection: 'single',
        },
      },
      getDetailRowData: (params) => {
       
        fetch(`http://localhost:4000/api/Colonne_master/${params.data.id_col}`)
          .then((resp) => resp.json())
          .then((data) => params.successCallback(data));
      },
    };
  }, []);



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
    

   const  id=formData.id_grille;
   
    if (id===3 ) {
      console.log(id)
      
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url , {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else  {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
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
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const onGridReady = useCallback((params) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        settableData(data);
      });
  }, []);

  /*const onGridReady = (params) => {
    console.log("grid is ready");
    setGridApi(params)
    /*fetch("http://localhost:4000/api/Grid_masters/").then(Resp=>Resp.json())
     .then(resp=>params.api.applyTransaction({add:resp}))//add new data to grid
  }*/
  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);
  
// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new Grid.Grid(gridDiv, formData);

  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      formData.api.setRowData(data);
    });
});

  return (
    <div >
      <Navbar/>
      {/* Example using Grid's API */}
      <div className='aggrid'>
      <button onClick={buttonListener}>Push Me</button>
      <button onClick={onBtExport} >
      Export to Excel
    </button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     
      <div className="ag-theme-alpine" style={{ width: 1200, height: 1200 }}>
      

        <Grid align="right">
          <Button variant="contained" color="primary" onClick={handleClickOpen} >Ajouter utilisateur</Button>
        </Grid>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}

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
