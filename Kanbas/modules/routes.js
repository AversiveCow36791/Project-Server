import db from "../Database/index.js";
import * as dao from "./dao.js";
function ModuleRoutes(app) {

const createModule = async (req, res) => {
    const { cid } = req.params;
    const newModule = await dao.createModule({ ...req.body, course: cid });
    res.json(newModule);
    };

const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
    };

const findAllModules = async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  };

const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.moduleId);
    res.json(module);
    };

const findAllModulesByCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findAllModulesByCourse(courseId);
    res.json(modules);
    };

const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    const currentModule = await dao.findModuleById(moduleId);
    res.json(currentModule);
    };



    // app.put("/api/modules/:mid", (req, res) => {
    //     const { mid } = req.params;
    //     const moduleIndex = db.modules.findIndex(
    //       (m) => m._id === mid);
    //     db.modules[moduleIndex] = {
    //       ...db.modules[moduleIndex],
    //       ...req.body
    //     };
    //     res.sendStatus(204);
    //   });
    


    // app.delete("/api/modules/:mid", (req, res) => {
    //   const { mid } = req.params;
    //   db.modules = db.modules.filter((m) => m._id !== mid);
    //   res.sendStatus(200);
    // });
  
  
    // app.post("/api/courses/:cid/modules", (req, res) => {
    //     const { cid } = req.params;
    //     const newModule = {
    //       ...req.body,
    //       course: cid,
    //       _id: new Date().getTime().toString(),
    //     };
    //     db.modules.push(newModule);
    //     res.send(newModule);
    //   });
    
  
    // app.get("/api/courses/:cid/modules", (req, res) => {
    //   const { cid } = req.params;
    //   const modules = db.modules
    //     .filter((m) => m.course === cid)
    //     .sort((a, b) => a.name[0].localeCompare(b.name[0]));
    //   res.send(modules);
    // });

    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/modules", findAllModules);
    app.get("/api/modules/:moduleId", findModuleById);
    app.get("/api/courses/:courseId/modules", findAllModulesByCourse);
    app.delete("/api/modules/:moduleId", deleteModule);
    app.put("/api/modules/:moduleId", updateModule);
    }

export default ModuleRoutes;