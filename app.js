import express from "express";
import path from "path";
import methodOverride from "method-override";
import engine from "ejs-mate";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";


import wrapasync from "./utils/wrapasync.js";
import Listing from "./model/listing.js";

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));

// main().then(()=>{
//     console.log("connected");
// })
// .catch((er)=>{
//     console.log(er);
// })

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


app.get("/listings", async (req,res)=>{

    let all_data = await Listing.find({});
    console.log(all_data);
    console.log(1);
    res.render("listings/index.ejs", {all_data});
});

app.get("/listings/new", (req, res)=>{
    res.render("listings/neww.ejs");
})

app.get("/listings/:id", async (req,res)=>{
    let id = req.params.id;
    const data = await Listing.findById(id);
    res.render("listings/show.ejs", {data});
});

app.get("/listings/:id/edit", async (req, res)=>{
    const id = req.params.id;
    const data = await Listing.findById(id);
    res.render("listings/edit.ejs", {data});
})

app.get("/listings/:id/delete", async (req, res)=>{
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.put("/listings/:id", wrapasync(async (req, res, next)=>{
    
    const id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.data});
    const all_data = await Listing.find({});
    // res.render("listings", {all_data});
    res.redirect("/listings");
    }
    ))

app.post("/listings", async (req, res)=>{
    const newdata = req.body.listing;
    let newlisting = new Listing(newdata);
    await newlisting.save();
    res.redirect("/listings");
})

app.use((req, res, err, next)=>{
    res.send("wrong!");
})

app.listen(port, ()=>{
    console.log("listening");
})