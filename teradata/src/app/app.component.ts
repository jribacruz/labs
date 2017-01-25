import { Component, ViewContainerRef } from '@angular/core';
import { MdIconRegistry } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'
import { TdDialogService, TdLoadingService, LoadingType, ILoadingOptions } from '@covalent/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    constructor(private _dialogService: TdDialogService,
        private viewContainerRef: ViewContainerRef,
        private _iconRegistry: MdIconRegistry,
        private _domSanitizer: DomSanitizer,
        private _loadingService: TdLoadingService) {

        let options: ILoadingOptions = {
            name: 'main',
            type: LoadingType.Circular,
        };
        this._loadingService.createOverlayComponent(options, viewContainerRef);
        this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'github',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));


    }
    save(): void {

    }
}
