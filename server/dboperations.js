var config=require('C:/React/MyGrid/client/server/dbconfig')
const sql=require('mssql')//connexion de sql  avec node js 

async function getGrid_master(){
    try{
        let pool= await sql.connect(config); //awiat et async always work together
        let AGGRID =await pool.request().query("SELECT * from grid_master");
        return AGGRID.recordsets;
    }catch(error){
       console.log(error);
    }
}

async function getColonne_detail(){
    try{
        let pool= await sql.connect(config); //awiat et async always work together
        let AGGRID =await pool.request().query("SELECT * from colonne_detail");
        return AGGRID.recordsets;
    }catch(error){
       console.log(error);
    }
}

async function getGrid_master_id(masterId) {
    try {
        let pool = await sql.connect(config);
        let AGGRID = await pool.request()
            .input('input_parameter', sql.Int, masterId)
            .query("SELECT * from grid_master where id_grille = @input_parameter");
        return AGGRID.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addgrid_master(grid_master){
    try{
        let pool= await sql.connect(config); //awiat et async always work together
        let AGGRID =await pool.request()
                                        .input('id_grille', sql.Int, grid_master.id_grille)
                                        .input('nom_grille', sql.NVarChar(255), grid_master.nom_grille)
                                        .input('taille_grille', sql.Int, grid_master.taille_grille)
                                        .input('couleur_fond_grille', sql.NVarChar(255), grid_master.couleur_fond_grille)
                                        .execute('InsertGrid');
        return AGGRID.recordsets;
    }catch(error){
       console.log(error);
    }
}

module.exports={
    getGrid_master:getGrid_master,
    getColonne_detail: getColonne_detail,
    getGrid_master_id:getGrid_master_id,
    addgrid_master:addgrid_master 
}