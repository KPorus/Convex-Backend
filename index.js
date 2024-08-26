import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import express from 'express';
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());
// fun part
app.use((req, res, next) => {
    console.log(req.path, "I am watching you.")
    next();
})
app.use(express.urlencoded({ extended: true }));

//console.log(app.get("env"))


const client = new ConvexHttpClient(process.env["CONVEX_URL"]);


// app.use('/api/v1', router)
app.get('/testing', async (req, res) => {  // Changed 'testing' to '/testing' to indicate a route
    try {
        const result = await client.query(api.project.getprojects);  // Await the result of the query
        
        res.json({
            result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add', async (req, res) => {
    try {
        // const { projectName } = req.body;

        // Assuming the 'createProject' function is defined in your client to insert data
        const newProject = await client.mutation(api.project.createProject, req.body);

        res.status(201).json({
            message: 'Project added successfully',
            data: newProject
        });
    } catch (error) {
        console.log(error.message);
    }
})

const port = 3000
app.listen(port,()=>{
    console.log("listening on port: ",port);
})