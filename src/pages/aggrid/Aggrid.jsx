import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./aggrid.css";
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "./utility.js";
import { Grid, Button } from '@material-ui/core'
import FormDialog from './dialog';
import Navbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/Footer';
const initialValue = { name: "", age: "", year: "", date: "" ,year:""}

function Aggrid() {

  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState();
  const url = `http://localhost:4000/users`
  const [formData, setFormData] = useState(initialValue)
  const [open, setOpen] = React.useState(false);
  const [columnDefs, setColumnDefs] = useState([

    //{ headerName: "ID", field: "id" },

    {
      headerName:'Name' , field: 'name', filter: 'agTextColumnFilter', checkboxSelection: true ,rowDrag: params => !params.node.group , cellRenderer: 'agGroupCellRenderer' /* lockPosition : true*/  /*pinned: 'left'*/
    },

    { headerName:'Age' ,field: 'age', filter: 'agNumberColumnFilter'},
   
    { headerName:'Year' ,field: 'year', filter: 'agSetColumnFilter',/* pinned: 'left'*/ },
    {
      headerName: "Actions", field: "id", cellRendererFramework: (params) => <div >
        <Button  variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Update</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Delete</Button>
      </div>
    },
    {
      headerName:'Country' , field: 'country', filter: 'agMultiColumnFilter' },

    { headerName:'Date' , field: 'date', filter: 'agDateColumnFilter', comparator: 'dateComparator' },


  ]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const masterDetail = true;
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
   // setting update row data to form data and opening pop up window
   const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
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
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  // affichage de alert 
  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.athlete} ${params.value}`)
  }
  
  
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    filterParams: {
     buttons: ['apply','clear','cancel','reset']
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
    floatingFilter: true,
    enableRowGroup: true, //aka lfaza te3 drag here to set a row groups
    resizable: true,
    accentedSort: true,// pour prendre en consideration les symboles et les caracteres spéciales 
    animateRows:true,
    // suppressMovable:true mouvement imposible pour les colonnes 
    enablePivot: true,
  }));
// pour enregister l'etat de la table 
  const saveState = () => {
    const colState = gridApi.columnApi.getColumnState();
    setLocalStorage(colState);
    closeSidebarToolpanel();
    console.log("column state saved");
  };
// pour restorer l'etat precedent de la table 
  const restoreState = (params) => {
    const colState = getLocalStorage();
    if (!colState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    params.columnApi.applyColumnState({
      state: colState,
      applyOrder: true,
    });
    closeSidebarToolpanel();
    console.log("column state restored");
  };
  // rendre la table à l'etat initiale
  const resetState = () => {
    gridApi.columnApi.resetColumnState();
    clearLocalStorage();
    closeSidebarToolpanel();
    console.log("column state reset");
  };
  const closeSidebarToolpanel = () => [gridApi.api.closeToolPanel()];
// ON GRIDREADY 
  const onGridReady = (params) => {
    setGridApi(params);
    restoreState(params)
  };

   // calling getUsers function for first time 
   useEffect(() => {
    getUsers()
  }, [])

  //fetching user data from server
  const getUsers = (params) => {
    fetch(url).then(resp => resp.json()).then(resp => setRowData(resp))
  }
  //exportation de donnée en csv
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const onBtnUpdate = useCallback(() => {
    document.querySelector(
      '#csvResult'
    ).value = gridRef.current.api.getDataAsCsv();
  }, []);

  // 
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          { field: 'number', minWidth: 150 },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode', minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    };
  }, []);

  return (
    <div>
        <Navbar/>
      <h1 align="center"> Your Data Grid</h1>
      <h3> Ag-grid</h3>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add user</Button>
      </Grid>
      <div className="ag-theme-alpine" style={{ width: 1200, height: 800 }}>

        <AgGridReact
          ref={gridRef}
          rowData={rowData}

          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowGroupPanelShow={'always'}
          animateRows={true} // animation l'orsque on fait le sort
          rowSelection="multiple"  // slection multiples des lignes
          multiSortKey={'shift'} // sorting avec plusieurs colones c-a-d on peut activer le propriété sorting en age et on athlete en meme temps
          rowDragManaged={true}
          rowDragMultiRow={true}
          columnHoverHighlight={true}
          popupParent={popupParent}
          detailCellRendererParams={detailCellRendererParams}
          //pagination={true}
        //  paginationPageSize={10}
          domLayout="autoHeight"
          //defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
         
          onGridReady={onGridReady}
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
              },

              {
                id: "save",
                labelDefault: "Save",
                iconKey: "menu",
                toolPanel: () => (
                

                    <div style={{ marginTop: 20 ,width:70 ,height:150, marginBottom: 10 , marginLeft: 55  }}>
                    <button onClick={saveState}>Save State</button><br /><br />
                    <button onClick={() => restoreState(gridApi)}>
                      Restore State
                    </button><br /><br />
                    <button onClick={resetState}>Reset State</button>
                  </div>

                ),
              },
              {
                id: "Export",
                labelDefault: "Export",
                iconKey: "menu",
                toolPanel: () => (
                  <div style={{ marginTop: 20 }}>
                    <button onClick={onBtnExport}>Download CSV export file</button>
                  </div>

                ),
              },
            ],
          }}
        />
        

      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
        <Footer/>
    </div>
  );
};

export default Aggrid;