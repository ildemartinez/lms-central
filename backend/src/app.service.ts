import { Injectable } from '@nestjs/common';
import { LMS } from './types/class_lms';

@Injectable()
export class AppService {
  fLMSS: LMS[] = [];

  constructor() {
    if (this.loadConfigFile()) {
      this.connectLMSNetwork();
    } else {
      console.log('Error with config.ini file');
    }
  }

  loadConfigFile(): boolean {
    var fs = require('fs'),
      ini = require('ini');
    try {
      console.log('Tesing if config.ini file exists');
      if (fs.existsSync('./config.ini')) {
        console.log('ok');
        var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

        var keys = Object.keys(config);

        for (var i = 0; i < keys.length; ++i) {
          if (typeof config[keys[i]] === 'object') {
            let aLMS = new LMS(
              keys[i],
              config[keys[i]].url,
              config[keys[i]].user,
              config[keys[i]].password,
              config[keys[i]].service,
            );
            aLMS.id = keys[i];
            this.fLMSS.push(aLMS);
            console.log('Found ' + keys[i]);
          }
        }
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  }

  connectLMSNetwork() {
    this.fLMSS.forEach(function (aLMS) {
      if (!aLMS.connected) {
        aLMS.connect();
      }
    });
    return JSON.stringify(this.fLMSS);
  }

  getRoot(): string {
    return '';
  }
}
