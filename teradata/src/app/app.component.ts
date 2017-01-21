import { Component, ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    constructor(private _dialogService: TdDialogService,
        private _viewContainerRef: ViewContainerRef) {
    }
    save(): void {
        this._dialogService.openAlert({
            message: 'This is how simple it is to create an alert with this wrapper service.',
            disableClose: false, // defaults to false
            viewContainerRef: this._viewContainerRef, //OPTIONAL
            title: 'Alert', //OPTIONAL, hides if not provided
            closeButton: 'Close', //OPTIONAL, defaults to 'CLOSE'
        });
    }
}
