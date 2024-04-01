const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expenseCategorySchema = new Schema({
    categoryIdategoryId:{type:String,required:true},
    categoryName:{type:String,required:true}
});

module.exports = mongoose.model('ExpenseCategory', expenseCategorySchema);