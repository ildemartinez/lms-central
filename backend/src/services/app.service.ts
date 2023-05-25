import { Injectable } from '@nestjs/common';
import { NetworkService } from './network.service';

@Injectable()
export class AppService {
  constructor(private readonly networkService: NetworkService) {
    if (this.loadConfigFile()) {
      this.networkService.connectLMSNetwork();
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
            this.networkService.addLMS(
              i,
              keys[i],
              config[keys[i]].url,
              config[keys[i]].user,
              config[keys[i]].password,
              config[keys[i]].service,
            );

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

  getLMSS() {
    return this.networkService.getLMSS();
  }
}
