var Db=require('../server/dboperations');
var grid_master=require('../server/grid_master');
const dboperations=require("../server/dboperations");
//ses 9 ligne we need it to create api
var express=require('express');
var bodyParser=require('body-parser'); //request and response body
var cors =require('cors'); 
var app=express();
var router=express.Router(); //create express router

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow all HTTP methods
    res.header("Access-Control-Allow-Headers", "Content-Type"); // Allow the Content-Type header
    next();
  });

  

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
})

router.route("/Grid_masters").get((request,response)=>{
    dboperations.getGrid_master().then(result=>{
        //console.log(result);
        response.json(result[0]);
    })
})

router.route("/Colonne_details").get((request,response)=>{
    dboperations.getColonne_detail().then(result=>{
        //console.log(result);
        response.json(result[0]);
    })
})
router.route("/Colonne_master").get((request,response)=>{
    dboperations.getcolonne_master().then(result=>{
        //console.log(result);
        response.json(result[0]);
    })
})
router.route("/Grid_masters/:id").get((request,response)=>{
    dboperations.getGrid_master_id(request.params.id).then(result=>{
        //console.log(result);
        response.json(result[0]);
    })
})

router.route("/Colonne_master/:id").get((request,response)=>{
    dboperations.getcolonne_master_id(request.params.id).then(result=>{
        //console.log(result);
        response.json(result[0]);
    })
})

router.route("/Grid_masters/:id").delete((request,response)=>{
    dboperations.deletegrid_master(request.params.id).then(result=>{
        //console.log(result);
        response.json(result[0]);
    })
})
router.route("/Grid_masters").post((request,response)=>{
    /*try {
        const data = request.body;
        const insert = dboperations.addgrid_master(data);
        response.send(insert);
    } catch (error) {
        response.status(400).send(error.message);
    }*/
    

   let grid_master={...request.body}
    dboperations.addgrid_master(grid_master).then(result=>{
        console.log(result);
        response.status(201).json(result);
    })
})

router.route("/Grid_masters").put((request,response)=>{
    
   let grid_master={...request.body}
    dboperations.updategrid_master(grid_master).then(result=>{
        console.log(result);
        response.status(201).json(result);
    })
})

 var port =process.env.PORT ||4000
 app.listen(port);
 console.log('grid_master is running at '+port)