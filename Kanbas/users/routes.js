import * as dao from "./dao.js";
let globalCurrentuser = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
   };
  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
    };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    } 
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
   };
  const updateUser = async (req, res) => { 
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    res.json(currentUser);
  };
  
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    } else {
    console.log(req.body)
    const currentUser = await dao.createUser(req.body);
    console.log(currentUser)
    req.session["currentUser"] = currentUser;
    globalCurrentuser = currentUser;
    res.json(currentUser);
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      globalCurrentuser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401);
    }
   };
  
  const signout = (req, res) => { 
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    let currentUser = req.session["currentUser"];
    currentUser = globalCurrentuser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
   };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

