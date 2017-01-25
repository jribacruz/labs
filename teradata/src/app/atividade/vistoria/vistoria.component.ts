import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
    selector: 'app-vistoria',
    templateUrl: './vistoria.component.html',
    styleUrls: ['./vistoria.component.css']
})
export class VistoriaComponent implements OnInit {

    columns: ITdDataTableColumn[] = [
        { name: 'food.name', label: 'Local de Votação' },
        { name: 'food.type', label: 'Endereço' },
        { name: 'calories', label: 'Bairo' }
    ];
    basicData: any[] = [
        {
            'id': 1,
            'food': {
                'name': 'Frozen yogurt',
                'type': 'Ice cream',
            },
            'calories': 159.0,
            'fat': 6.0,
            'carbs': 24.0,
            'protein': 4.0,
            'sodium': 87.0,
            'calcium': 14.0,
            'iron': 1.0,
            'comments': 'I love froyo!',
        }, {
            'id': 2,
            'food': {
                'name': 'Ice cream sandwich',
                'type': 'Ice cream',
            },
            'calories': 237.0,
            'fat': 9.0,
            'carbs': 37.0,
            'protein': 4.3,
            'sodium': 129.0,
            'calcium': 8.0,
            'iron': 1.0,
        }, {
            'id': 3,
            'food': {
                'name': 'Eclair',
                'type': 'Pastry',
            },
            'calories': 262.0,
            'fat': 16.0,
            'carbs': 24.0,
            'protein': 6.0,
            'sodium': 337.0,
            'calcium': 6.0,
            'iron': 7.0,
        },
    ];
    constructor() { }

    ngOnInit() {
    }

}
