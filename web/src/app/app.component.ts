import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yhs-components';

  copyWebEnvToClipboard() {
    const url = window.location.host;
    const copyString = `"moduleFederationRemoteEntry": "${url}/remoteEntry.js",
                "allocationsDrawerRemoteComponent": "./AllocationsDrawerComponent"`;
    navigator.clipboard
      .writeText(copyString)
      .catch((error) => console.error('Writing to the clipboard is not allowed. ', error));
  }
}
