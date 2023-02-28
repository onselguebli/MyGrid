const config={
    server:'DESKTOP-QDUG0RM',
    user:"admin",
    password:"admin",
    database: 'AGGRID',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instanceof:'MSSQLSERVERR',
        encrypt: false,
    },
   port:1433
}

module.exports=config;
