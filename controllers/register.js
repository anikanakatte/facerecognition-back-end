handleRegister = (req, res, db, bcrypt) => {
    
    const { name, email, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json("Invalid credentials. Cannot register");
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                console.log("New user registered");
                res.json(user[0]);
            })            
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("Unable to register"));
}

module.exports = {
    handleRegister: handleRegister
}