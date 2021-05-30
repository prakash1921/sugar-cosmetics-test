
const userModel = require('../user/user.model')
const mongoose = require('mongoose');
const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Xlsx=require('xlsx')
var parser = require("simple-excel-to-json");
const file= path.join('','public/excel/250_unique_codes.csv');
function convertcsvtojson(){
var wb=Xlsx.readFile(file,{cellDates:true});
var ws = wb.Sheets['Sheet1'];
var exdata=Xlsx.utils.sheet_to_json(ws);


    async.eachSeries(exdata,function(file,cb){
if(file){
    console.log(file['2FaeBaiw'])
    var record={};
    record.code=file['2FaeBaiw'];
    record.valid=true;
    var unique= new userModel.uniquecode(record);
    unique.save();
    cb();
}else{
    cb();
}
    },function(re,re){
       
    })

}

// convertcsvtojson()

    // userModel.uniquecode.find({},function(err,res){
//     console.log(res.length)
// })