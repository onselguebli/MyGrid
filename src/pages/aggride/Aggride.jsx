//import React from "react";
//import {render} from "react-dom";

/*import "ag-grid-root/dist/styles/ag-grid.css";
import "ag-grid-root/dist/styles/ag-theme-balham.css";

import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-13_March2023[v2]_MTY3ODY2NTYwMDAwMA==bdcda07fe581ca15b2a010bbef2b2513");
const url = "http://localhost:4000/api/Grid_masters";

var getRows = (params) => {
    const rows = [
      {
        outlineLevel: 1,
        cells: [
          cell(''),
          cell('id_colonne', 'header'),
          cell('id_grille', 'header'),
          cell('nom_colonne', 'header'),
          cell('largeur_colonne', 'header'),
         
        ],
      },
    ].concat(
      ...params.node.data.callRecords.map((record) => [
        {
          outlineLevel: 1,
          cells: [
            cell(''),
            cell(record.id_colonne, 'body'),
            cell(record.id_grille, 'body'),
            cell(record.nom_colonne, 'body'),
            cell(record.largeur_colonne, 'body'),
          ],
        },
      ])
    );
    return rows;
  };
  
  var defaultCsvExportParams = {
    getCustomContentBelowRow: (params) => {
      const rows = getRows(params);
  
      return rows.map((row) => row.cells);
    },
  };
  var defaultExcelExportParams = {
    getCustomContentBelowRow: (params) => getRows(params),
    columnWidth: 120,
    fileName: 'ag-grid.xlsx',
  };
  
  /** @type {import('ag-grid-community').GridOptions} */
  /*const gridOptions = {
    columnDefs: [
      // group cell renderer needed for expand / collapse icons
      { field: 'id_grille', cellRenderer: 'agGroupCellRenderer' },
      { field: 'nom_grille' },
      { field: 'taille_grille' },
      { field: 'couleur_fond_grille' },
    ],
    defaultColDef: {
      flex: 1,
    },
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          { field: 'id_colonne' },
          { field: 'id_grille' },
          { field: 'nom_colonne', minWidth: 150 },
          { field: 'largeur_colonne' },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    },
    defaultCsvExportParams: defaultCsvExportParams,
    defaultExcelExportParams: defaultExcelExportParams,
    excelStyles: [
      {
        id: 'header',
        interior: {
          color: '#aaaaaa',
          pattern: 'Solid',
        },
      },
      {
        id: 'body',
        interior: {
          color: '#dddddd',
          pattern: 'Solid',
        },
      },
    ],
  };
  
  function cell(text, styleId) {
    return {
      styleId: styleId,
      data: {
        type: /^\d+$/.test(text) ? 'Number' : 'String',
        value: String(text),
      },
    };
  }
  
  function onBtExport() {
    gridOptions.api.exportDataAsExcel();
  }
  
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        gridOptions.api.setRowData(data);
      });
  });*/
  