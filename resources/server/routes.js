const routes = (app, streams) => {
    app.get('/streams.json', (req,res) => {
        res.status(200).json(streams.getStreams());
    });

    app.post('/streams/:id',(req,res)=>{
        streams.addStream(req.params.id,"maddy");
        res.status(200).json({"result" : "OK"});
    });

    app.get('/streams/:id',(req,res)=>{
        res.status(200).json(streams.getStream(req.params.id));
    });
}

export default routes;