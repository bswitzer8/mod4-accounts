const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/accounts');

const Account = mongoose.model('Account', 
{ 
  name: String,
  balance: Number
})


module.exports = {
	getAccounts(req, res, next)  { 
		Account.find({}, null, {}, (error, accounts) => {
			res.status(200).send(accounts);
			next();
		});
	},
	addAccount(req, res, next)  {
		let newAccount = new Account(req.body);
		
		newAccount.save((error, results) => {
			if (error) return next(error);
			res.status(201).send(results);
		})
	},
	updateAccount(req, res, next) {
			Account.findById(req.params.id, (error, account) => {
			if (error) return next(error)
			
			account.name = req.body.name ? req.body.name : account.name;
			account.balance = req.body.balance? req.body.balance : account.balance;
			
			account.save((error, results) => {
			  res.status(200).send(results)
			})
		  })
	},
	removeAccount(req, res, next) {
		Account.findById(req.params.id, (error, account) => {
			if (error) return next(error)
			account.remove((error, results) => {
			  if (error) return next(error)
			  res.status(204).send(results)
			})
		  })
	}
}
	