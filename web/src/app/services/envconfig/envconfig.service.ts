import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { EnvConfig } from '@app/models/envconfig.model';

const ENV_CONFIG_JSON_URL = './assets/config/envconfig.json';

export function envConfigFactory(envConfig: EnvConfigService) {
  return () => envConfig.loadEnvConfig();
}

@Injectable({
  providedIn: 'root',
})
export class EnvConfigService {
  private envConfig: EnvConfig;
  private uiProtocol: string;
  private uiHostname: string;
  private uiPort: string;

  constructor(private httpClient: HttpClient) {
    this.uiProtocol = window.location.protocol;
    this.uiHostname = window.location.hostname;
    this.uiPort = window.location.port;
    this.envConfig = {
      yunikornApiURL: 'http://localhost:9889',
      yhsApiURL: 'http://localhost:8989',
    };
  }

  loadEnvConfig(): Promise<void> {
    return new Promise((resolve) => {
      this.httpClient.get<EnvConfig>(ENV_CONFIG_JSON_URL).subscribe((data) => {
        this.envConfig = data;
        resolve();
      });
    });
  }

  getYuniKornWebAddress() {
    if (this.envConfig.yunikornApiURL) {
      return this.envConfig.yunikornApiURL;
    }

    return `${this.uiProtocol}//${this.uiHostname}:${this.uiPort}/ws`;
  }

  getYHSWebAddress() {
    if (this.envConfig.yhsApiURL) {
      return this.envConfig.yhsApiURL;
    }

    return `${this.uiProtocol}//${this.uiHostname}:${this.uiPort}/api`;
  }

  getExternalLogsBaseUrl() {
    return this.envConfig.externalLogsURL || null;
  }
}
