import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {UtilityProvider} from "../utility/utility";


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

  constructor(private camera: Camera, public file: File, public filepath: FilePath, public utility: UtilityProvider) {
    // console.log(file.dataDirectory);
    // console.log('Hello UploadfileServiceProvider Provider');
    this.createFile("images").then((val) => {
      console.log("images File directory info: " + val);
      this.filesPath = file.dataDirectory + 'images/';
    }).catch((e) => {
      console.log("Error 2 " + e)
      this.filesPath = file.dataDirectory + 'images/';
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
      console.log(imagedata);
        this.imageUri = imagedata;
      // let path = imagedata.substring(0, imagedata.lastIndexOf("/"));
      // this.file.resolveLocalFilesystemUrl('file://'+path).then((s)=>{
      //   console.log(s);
      // }).catch(e=>console.log(e));
      // this.saveImage(imagedata, "Esdjfhghkfhfnj,fk.jpg")
      // this.filepath.resolveNativePath('file://'+path)
      //   .then(filePath => console.log(filePath))
      //   .catch(err => console.log(err));
        this.imageProperties();
        return {imageUri: imagedata, options: this.options};
      }, (err) => {
      this.utility.callToast(err, "alert", false);
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
    return this.checkDirectory(dirname).then((val: any) => {
      // if (val) {

      // } else {
      console.log("directory Exists");
      // }
    }).catch((e) => {
      console.log("Error 1 " + e);
      return this.file.createDir(this.file.dataDirectory, dirname, false);
    });
  }

  copyfilestoImages(path, filename, newpath, newfilename) {

    return this.file.copyFile(path, filename, newpath, newfilename)
  }

  saveImage(path, newfilename) {
    let filename = path.split("/").pop();
    path = path.substring(0, path.lastIndexOf("/"));

    let newpath = this.filesPath;
    console.log(path + " " + filename + " " + newpath + " " + newfilename);
    this.file.resolveLocalFilesystemUrl('file://' + path).then((s) => {
      console.log(s);
      this.copyfilestoImages(s.nativeURL, filename, newpath, newfilename).then((res) => {
        console.log(res);
      }).catch((e) => {
        console.log("error from copy file images");
        console.log(e);
      });
    }).catch(e => console.log(e));

  }


}
