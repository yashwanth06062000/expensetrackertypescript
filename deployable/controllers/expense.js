"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const expense = require('../models/expense');
const ledb = require("../models/leaderboard");
const items_perpage = 2;
exports.addexpense = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const money = req.body.money;
    const description = req.body.description;
    const category = req.body.category;
    req.user.createExpense({
        ctegory: category,
        money: money,
        description: description
    }).then(() => {
        console.log(req.user);
        req.user.getLeaderboard().then((e) => __awaiter(void 0, void 0, void 0, function* () {
            var value = e.dataValues.totalexpense;
            value += Number(money);
            yield e.update({ totalexpense: value }).then((e1) => { console.log(e1); }).catch(err => console.log(err));
        })).catch(err => console.log(err));
        res.json({ message: "successfully added" });
    });
}));
exports.getexpenses = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("i am in expenses");
    const page = req.query.page || 1;
    let totalitems = 0;
    const userId = req.user.id;
    const expcount = yield expense.count({ where: { UserId: userId } });
    const hasnextpage = items_perpage * page < expcount;
    const haspreviouspage = page > 1;
    const nextpage = Number(page) + 1;
    const previouspage = Number(page) - 1;
    const lastpage = Math.ceil(expcount / items_perpage);
    let obj = {
        currentpage: Number(req.query.page),
        hasnextpage: hasnextpage,
        haspreviouspage: haspreviouspage,
        nextpage: nextpage,
        previouspage: previouspage,
        lastpage: lastpage
    };
    req.user.getExpenses({ offset: (page - 1) * items_perpage, limit: items_perpage }).then((expenses) => {
        res.json({ expenses, success: true, obj });
    }).catch(err => console.log(err));
}));
exports.deleteexpense = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dltid = req.body.id;
    expense.findByPk(dltid).then((expensed) => {
        req.user.getLeaderboard().then((e) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log(e,"i am e boy u are searching for")
            var value = e.dataValues.totalexpense;
            value -= Number(expensed.money);
            yield e.update({ totalexpense: value });
        }));
        expensed.destroy();
        res.sendStatus(201);
    }).catch(err => console.log(err));
}));
