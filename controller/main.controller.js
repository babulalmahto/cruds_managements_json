const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../database/database.json");

class mainController {
    getUser(req, res) {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });
            res.status(200).json({
                status: 200,
                message: "Data fetch successfully",
                data: JSON.parse(data),
            });
        });
    }

    createUser(req, res) {
        const { username, name, age } = req.body;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });

            let userData = JSON.parse(data);

            const ifUsernamePresent = userData.find(elem => elem.username === username);
            if (ifUsernamePresent) return res.status(409).json({
                status: 409,
                message: "Username already present"
            });
            userData.push({ name, age, username });
            userData = JSON.stringify(userData);
            fs.writeFile(filePath, userData, (err, data) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "Something went wrong"
                });
                console.log(data);
                res.status(200).json({
                    status: 200,
                    message: "Data created successfully"
                });
            });
        });
    }

    updateUser(req, res) {
        const { username, name, age } = req.body;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong"
            });

            let userData = JSON.parse(data);

            const ifUsernamePresent = userData.find(elem => elem.username === username);
            if (!ifUsernamePresent) return res.status(400).json({
                status: 400,
                message: "Username not present"
            });

            userData = userData.map(user => {
                if (user.username === username) {
                    if (name) user.name = name;
                    if (age) user.age = age;
                }
                return user;
            });

            userData = JSON.stringify(userData);

            fs.writeFile(filePath, userData, (err, data) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "Something went wrong"
                });
                res.status(200).json({
                    status: 200,
                    message: "Data updated successfully"
                });
            });
        });
    }

    deleteUser(req, res) {
        const username = req.body.username;
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "something went wrong"
            });
            let userData = JSON.parse(data);

            const ifUsernamePresent = userData.find(elem => elem.username === username);
            if (!ifUsernamePresent) return res.status(404).json({
                status: 404,
                message: "Username not present."
            });

            userData = userData.filter(elem => elem.username !== username);

            userData = JSON.stringify(userData);
           
            fs.writeFile(filePath, userData, (err, data) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "something went wrong"
                });
                
                res.status(200).json({
                    status: 200,
                    message: "Successfully deleted"
                });
            });
        });
    }
}

module.exports = new mainController;