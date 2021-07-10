const UserSchema = require('../models/UserSchema');
const ExpenseSchema = require('../models/ExpenseSchema');

const registerUser = async (req, resp) => {

    UserSchema.findOne({email: req.body.email}, (error, result) => {
        if (error) {
            resp.status(500).json({message: error});
        } else {
            if (result !== null) {
                let data = {
                    message: 'email address is already exists',
                    status: false
                }
                resp.status(400).json({data});
            } else {
                const user = new UserSchema({
                    fName: req.body.fName,
                    lName: req.body.lName,
                    email: req.body.email,
                    password: req.body.password
                });
                user.save().then(savedResponse => {
                    let dataObj = {
                        message: 'success',
                        state: true
                    }
                    resp.status(200).json({dataObj})
                }).catch(savedResponseError => {
                    resp.status(500).json({
                        message: 'internal server error',
                        state: false,
                        error: savedResponseError
                    });
                });
            }
        }
    });
};

// const updateUser = async (req, resp) => {
//
//     UserSchema.findOne({email: req.body.email}, (error, result) => {
//         if (error) {
//             resp.status(500).json({message: error});
//         } else {
//             if (result !== null) {
//                 let data = {
//                     message: 'email address is already exists',
//                     status: false
//                 }
//                 resp.status(400).json({data});
//             } else {
//                 const user = new UserSchema({
//                     fName: req.body.fName,
//                     lName: req.body.lName,
//                     email: req.body.email,
//                     password: req.body.password
//                 });
//                 user.save().then(savedResponse => {
//                     let dataObj = {
//                         message: 'success',
//                         state: true
//                     }
//                     resp.status(200).json({dataObj})
//                 }).catch(savedResponseError => {
//                     resp.status(500).json({
//                         message: 'internal server error',
//                         state: false,
//                         error: savedResponseError
//                     });
//                 });
//             }
//         }
//     });
// };

// const deleteUser = (req, resp) => {
// };

// const searchUser = (req, resp) => {
//
// };

const login = (req, resp) => {
    const email = req.headers.email ? req.headers.email : null;
    const password = req.headers.password ? req.headers.password : null;

    try {
        if (email !== null && password !== null) {
            UserSchema.findOne({email: email}, (error, result) => {
                if (error) {
                    resp.status(500).json({message: error});
                } else {
                    if (result !== null) {
                        resp.status(200).json({
                            message: 'success',
                            data: result,
                            state: true
                        });
                    } else {
                        let data = {
                            message: 'User Can\'t find',
                            status: false
                        }
                        resp.status(400).json({data});
                    }
                }
            })
        } else {
            resp.status(400).json({message: 'Please provide valid user name and password'});
        }
    } catch (e) {
        resp.status(500).json({message: 'internal Server Error..', error: e});
    }
};

const updateUserWithExpenses = async (req, resp) => {
    try {
        const expense = new ExpenseSchema({
            date: req.body.date,
            traveling: req.body.traveling,
            food: req.body.food
        });
        const userID = req.body.id;
        console.log(userID);
        const newExpense = await expense.save();
        const newUser = await UserSchema.findByIdAndUpdate(
            userID,
            {
                $push: {expenseID: newExpense._id}
            },
            {new: true, useFindAndModify: false},
        );
        resp.send(newUser);

    } catch (err) {
        console.log(err);
    }
}

const getAllUserExpenses = async (req, resp) => {
    // const email = req.headers.email ? req.headers.email : null;
    // console.log(req.params.email);
    // console.log(req.params);

    const users = await UserSchema.findOne({email: req.params.email}).populate("expenseID", "-__v");
    let data = {
        message: 'success',
        data: users,
        status: true
    }
    resp.status(200).json({data});
}

module.exports = {registerUser, login, updateUserWithExpenses, getAllUserExpenses}