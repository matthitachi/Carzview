import {Injectable} from '@angular/core';
import {UtilityProvider} from "../utility/utility";
import {DbProvider} from "../db/db";
import {Car} from "../../Model/car";

/*
  Generated class for the CarserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarserviceProvider {

  constructor(public db: DbProvider, public utility: UtilityProvider) {
    console.log('Hello CarserviceProvider Provider');
  }

  createCar(data) {

    let option = [data.carname, data.model, data.color, data.platenumber, data.image, parseInt(data.cost),
      parseInt(data.worth), data.desc, 0];
    let query = "Insert into cars (name, model, color, plate_number, image, cost, worth, desc, trash, updated, created) " +
      "values (?,?,?,?,?,?,?,?,?,datetime('now', 'localtime'),datetime('now', 'localtime'))";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);

      // this.getUser('Admin');
      if (response.rowsAffected > 0) {
        return {status: true, message: "Cars created successfully"};
      } else {
        return {status: false, message: "Not completed"};
      }

    }).catch((e) => {
      console.log(e);
      return {status: false, message: "An error occured"};
    });


  }

  updateCar(data) {

    let option = [data.carname, data.model, data.color, data.platenumber, data.image, parseInt(data.cost),
      parseInt(data.worth), data.desc, data.id];
    let query = "Update cars Set name = ?, model = ?, color = ?, plate_number = ?, image = ?, cost = ?, worth = ?, desc = ?, updated = datetime('now', 'localtime') where id = ? ";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);

      // this.getUser('Admin');
      if (response.rowsAffected > 0) {
        return {status: true, message: "Cars Updated successfully"};
      } else {
        return {status: false, message: "Not completed"};
      }

    }).catch((e) => {
      console.log(e);
      return {status: false, message: "An error occured"};
    });


  }

  carList(dataList) {

    // let car:Car;
    if (dataList.length == 1) {
      let car = new Car();
      car.id = dataList.item(0).id;
      car.carname = dataList.item(0).name;
      car.model = dataList.item(0).model;
      car.color = dataList.item(0).color;
      car.platenumber = dataList.item(0).plate_number;
      car.image = dataList.item(0).image;
      car.cost = dataList.item(0).cost;
      car.worth = dataList.item(0).worth;
      car.desc = dataList.item(0).desc;
      return car;

    } else if (dataList.length > 1) {
      let cars: Car[] = [];
      for (let i = 0; i < dataList.length; i++) {
        let car = new Car();
        car.id = dataList.item(i).id;
        car.carname = dataList.item(i).name;
        car.model = dataList.item(i).model;
        car.color = dataList.item(i).color;
        car.platenumber = dataList.item(i).plate_number;
        car.image = dataList.item(i).image;
        car.cost = dataList.item(i).cost;
        car.worth = dataList.item(i).worth;
        car.desc = dataList.item(i).desc;
        cars.push(car);
      }
      return cars;
    } else {
      return null;
    }


  }

  getCarbyId(id) {
    let option = [id];
    let query = "Select id, name, model, color, plate_number, desc, worth, cost, image  from cars where trash = 0 and id = ?";
    return this.db.execQuery(query, option).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let data = this.carList(response.rows);
        console.log(" car by id data " + JSON.stringify(data));
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

  GetAllCars() {
    // let option = [""];
    let query = "Select id, name, model, color, plate_number, desc, worth, cost, image  from cars where trash = 0";
    return this.db.execQuery(query).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        let cars: Car[] = [];
        // let car:Car;
        for (let i = 0; i < response.rows.length; i++) {
          let car = new Car();
          car.id = response.rows.item(i).id;
          car.carname = response.rows.item(i).name;
          car.model = response.rows.item(i).model;
          car.color = response.rows.item(i).color;
          car.platenumber = response.rows.item(i).plate_number;
          car.image = response.rows.item(i).image;
          car.cost = response.rows.item(i).cost;
          car.worth = response.rows.item(i).worth;
          car.desc = response.rows.item(i).desc;
          cars.push(car);
        }


        console.log(cars);
        return {status: true, message: "Success", data: cars};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured", data: ""};

      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  deleteCar(id) {
    let options = [id];
    let query = "Update cars Set trash = 1 where id = ?";
    return this.db.execQuery(query, options).then((response) => {
      console.log(response);
      if (response.rowsAffected > 0) {
        return {status: true, message: "Success"};
      } else {
        console.log("No data Found");
        return {status: false, message: "An error occured"};
      }

    }).catch((e) => {
      console.log(e);
      // return {status:false, message:"An error occured"};
    });
  }

  countCar() {
    let query = "SELECT Count(*) as count FROM cars where trash = 0";
    return this.db.execQuery(query).then((response) => {
      console.log(response);
      if (response.rows.length > 0) {
        return {status: true, message: "Success", data: response.rows.item(0).count};
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
