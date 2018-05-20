import {Injectable} from '@angular/core';
import {UtilityProvider} from "../utility/utility";
import {DbProvider} from "../db/db";
import {Transaction} from "../../Model/transaction";

/*
  Generated class for the TransactionserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionserviceProvider {

  constructor(public db: DbProvider, public utility: UtilityProvider) {
    console.log('Hello TransactionserviceProvider Provider');
  }

  createTransaction(data) {

    let option = [data.caroptions, data.driveroptions, data.amount, data.desc, 0, data.dt];
    let query = "Insert into transactions (car, user, amount, desc, trash, updated, created) " +
      "values (?,?,?,?,?,datetime('now', 'localtime'),?)";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);

      // this.getUser('Admin');
      if (response.rowsAffected > 0) {
        return {status: true, message: "Transaction created successfully"};
      } else {
        return {status: false, message: "Not completed"};
      }

    }).catch((e) => {
      console.log(e);
      return {status: false, message: "An error occured"};
    });


  }

  deleteTrans(id) {
    let options = [id];
    let query = "Update transactions Set trash = 1 where id = ?";
    return this.db.execQuery(query, options).then((response) => {
      console.log(response);
      if (response.rowsAffected > 0) {
        return {status: true, message: "Delete Successful"};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured"};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  getAllTrans(limit = 50, option?: string, value?: number) {
    let query = "Select transactions.id as id, name, username, amount, transactions.desc as desc, transactions.created as created  from transactions, users, cars where " +
      "transactions.car = cars.id and users.carid = transactions.car and users.id = transactions.user and transactions.trash = 0";
    let queryaddition: string = "";
    let options = [];
    if (option == 'car') {
      queryaddition += " and transactions.car = ?";
      options.push(value);
    } else if (option == 'driver') {
      queryaddition += " and transactions.user = ?";
      options.push(value);
    } else {
      queryaddition = "";
    }
    let queryendiing = " ORDER BY created DESC limit ?"
    query = query + queryaddition + queryendiing;
    options.push(limit);

// console.log(query);
    return this.db.execQuery(query, options).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let data = this.transList(response.rows, true);
        console.log(data);
        return {status: true, message: "Success", data: data};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  transList(dataList, array = false) {

    // let car:Car;
    if (dataList.length == 1) {
      let trans = new Transaction();
      trans.id = dataList.item(0).id;
      trans.drivername = dataList.item(0).username;
      trans.carname = dataList.item(0).name;
      trans.amount = dataList.item(0).amount;
      trans.desc = dataList.item(0).desc;
      trans.created = dataList.item(0).created;
      if (array) {
        return [trans];
      } else {
        return trans;
      }


    } else if (dataList.length > 1) {
      let transactions: Transaction[] = [];
      for (let i = 0; i < dataList.length; i++) {
        let trans = new Transaction();
        trans.id = dataList.item(i).id;
        trans.drivername = dataList.item(i).username;
        trans.carname = dataList.item(i).name;
        trans.amount = dataList.item(i).amount;
        trans.desc = dataList.item(i).desc;
        trans.created = dataList.item(i).created;
        transactions.push(trans);
      }
      return transactions;
    } else {
      return null;
    }


  }

  totalEarnings(selectby = "", id?: number) {
    let query = "Select sum(amount) as total from transactions where trash = 0";
    let optional = "";
    let options = [];
    if (selectby == 'car') {
      optional = " and car = ?";
      options.push(id);
    } else if (selectby == 'driver') {
      optional = " and user = ?";
      options.push(id);
    } else {
      options = [];
      optional = ""
    }
    query = query + optional;
    console.log(query + id + options[0]);
    return this.db.execQuery(query, options).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let data = {total: response.rows.item(0).total};
        console.log(data);
        return {status: true, message: "Success", data: data};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  seasonEarnings(season) {
    let option = '';

    if (season == 'Y') {
      option = '%Y';
    } else if (season == 'M') {
      option = '%m';
    } else if (season == 'D') {
      option = '%d';
    } else {
      option = '%Y';
    }
    let options = [option, option];
    let query = "Select sum(amount) as total from transactions where strftime(?,created) = strftime(?, 'now') and trash = 0";
    return this.db.execQuery(query, options).then((response) => {
      console.log(response.rows.item(0));
      if (response.rows.length > 0) {
        let data = {total: response.rows.item(0).total};
        console.log(data);
        return {status: true, message: "Success", data: data};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  filter(limit, searchby?, from?, to?, keyword?, order?) {
    let options = [];

    let searchbyquery = "";
    let datequery = " and transactions.created between ? and ?";
    options.push(from);
    options.push(to);


    if (searchby != "" && keyword != "") {
      if (searchby == 'Car') {
        searchbyquery = " and (cars.name like ? or cars.model like ? or cars.plate_number like ?) ";
        options.push('%' + keyword + '%');
        options.push('%' + keyword + '%');
        options.push('%' + keyword + '%');
      } else {
        searchbyquery = " and (username like ? or fname like ?  or lname like ?)";
        options.push('%' + keyword + '%');
        options.push('%' + keyword + '%');
        options.push('%' + keyword + '%');
      }
    }
    let orderQuery = " ORDER BY transactions.created " + order;
    // options.push(order);

    let limitquery = " Limit ?";
    options.push(limit);


    // let option = [limit];
    let query = "Select DISTINCT  transactions.id as id, name, username, amount, transactions.desc as desc, transactions.created as created  from transactions, users, cars where " +
      "transactions.car = cars.id and users.carid = transactions.car  and users.id = transactions.user and transactions.trash = 0";
    query = query + datequery + searchbyquery + orderQuery + limitquery;
    console.log(query);
    console.log(JSON.stringify(options));
    return this.db.execQuery(query, options).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let data = this.transList(response.rows, true);
        console.log(data);
        return {status: true, message: "Success", data: data};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }
}
