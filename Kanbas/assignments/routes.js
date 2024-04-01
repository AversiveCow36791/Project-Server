import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {


    app.put("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const assignmentIndex = Database.assignments.findIndex(
            (a) => a._id === id);
        Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });


    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignment = { ...req.body,
            course: cid,
            _id: new Date().getTime().toString() };
        Database.assignments.push(assignment);
        res.send(assignment);
    });

    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        Database.assignments = Database.assignments
            .filter((a) => a._id !== id);
        res.sendStatus(204);
    });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = Database.assignments
            .filter((a) => a.course === cid)
            .sort((a, b) => a.title[0].localeCompare(b.title[0]));
        res.send(assignments);
    });

}