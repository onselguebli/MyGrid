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
async function deletegrid_master(masterId) {
    try {
        let pool = await sql.connect(config); //awiat et async always work together
        let AGGRID = await pool.request()
            .input('input_parameter', sql.Int, masterId)
            .query("delete  from grid_master where id_grille = @input_parameter");
        return AGGRID.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updategrid_master(grid_master){
    try{
        let pool= await sql.connect(config); //awiat et async always work together
        let AGGRID =await pool.request()
                                        .input('id_grille', sql.Int, grid_master.id_grille)
                                        .input('nom_grille', sql.NVarChar(255), grid_master.nom_grille)
                                        .input('taille_grille', sql.Int, grid_master.taille_grille)
                                        .input('couleur_fond_grille', sql.NVarChar(255), grid_master.couleur_fond_grille)
                                        .query('UPDATE grid_master SET  nom_grille = @nom_grille, taille_grille=@taille_grille ,couleur_fond_grille=@couleur_fond_grille where  id_grille = @id_grille')
        return AGGRID.recordsets;
    }catch(error){
       console.log(error);
    }
}

async function getcolonne_master() {
    try {
        let pool = await sql.connect(config);
        let AGGRID = await pool.request()
            
            .query("select id_colonne,nom_colonne,largeur_colonne,couleur_colonne from colonne_detail,grid_master where colonne_detail.id_colonne=grid_master.id_col");
        return AGGRID.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function getcolonne_master_id(masterId) {
    try {
        let pool = await sql.connect(config);
        let AGGRID = await pool.request()
            .input('input_parameter', sql.NVarChar, masterId)
            .query("SELECT * from colonne_detail where id_colonne = @input_parameter");
        return AGGRID.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}



module.exports={
    getGrid_master:getGrid_master,
    getColonne_detail: getColonne_detail,
    getGrid_master_id:getGrid_master_id,
    addgrid_master:addgrid_master ,
    deletegrid_master:deletegrid_master,
    updategrid_master:updategrid_master,
    getcolonne_master:getcolonne_master,
    getcolonne_master_id:getcolonne_master_id
}