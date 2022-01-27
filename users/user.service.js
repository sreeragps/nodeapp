const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity,will be in db
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'customer', password: 'customer', firstName: 'customer', lastName: 'User', role: Role.Customer },
    { id: 3, username: 'moderator', password: 'moderator', firstName: 'moderator', lastName: 'User', role: Role.Moderator }
];

module.exports = {
    authenticate,
    getAll,
    getById,
    getByType
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function getByType() {
    const userModerator = users.map(u =>{

        if(u.role==Role.Moderator){
            const { password, ...userWithoutPassword } = u;
            return userWithoutPassword;
        }
    } )
   
    return userModerator;
   
}