import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";


/*
  Generated class for the UploadfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadfileServiceProvider {

  imageUri: any;
  imageFilename: any;
  options: any;
  returnObj: any;
  filesPath;

  constructor(private camera: Camera, public file: File) {
    console.log('Hello UploadfileServiceProvider Provider');
    this.createFile("images").then((val) => {
      console.log("images File directory info: " + val);
      this.filesPath = file.dataDirectory + '/images/';
    });
  }

// source is either camara or library
  getImage(source) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: (source == 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 400
    }


    return this.camera.getPicture(options).then((imagedata) => {

        this.imageUri = imagedata;
        this.imageProperties();
        return {imageUri: imagedata, options: this.options};
      }, (err) => {
        console.log(err);
      }
    )
  }

  imageProperties() {
    let image_prefix = "carview";
    let distinct = new Date().getTime();
    // distinct.replace(' ','_');
    var filename = this.imageUri.split("/").pop();
    let imagename = image_prefix + distinct + filename;


    this.options = {
      fileKey: "carview_file",
      fileName: imagename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
      params: {}
    }


  }

  checkDirectory(dirname) {
    return this.file.checkDir(this.file.dataDirectory, dirname);
  }

  createFile(dirname) {
    return this.checkDirectory(dirname).then((val) => {
      if (val) {
        return this.file.createDir(this.file.dataDirectory, dirname);
      } else {
        return "directory Exists";
      }
    });
  }

  copyfilestoImages(path, filename, newpath, newfilename) {

    return this.file.copyFile(path, filename, newpath, newfilename)
  }

  saveImage(path, newfilename) {
    path = path.substring(0, path.lastIndexOf("/"));
    filename = path.split("/").pop();
    newpath = this.filesPath;
    this.copyfilestoImages(path, filename, newpath, newfilename).then((res) => {
      console.log(res);
    });
  }


}
