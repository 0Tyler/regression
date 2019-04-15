import { DataXY } from './DataXY';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-regression',
    templateUrl: './regression.component.html',
    styleUrls: ['./regression.component.scss']
})
export class RegressionComponent implements OnInit {

    dataXYs = new Array<DataXY>();
    chart: {
        title: string,
        type: string,
        data: Array<Array<string | number | {}>>,
        roles: Array<{ type: string, role: string, index?: number }>,
        columnNames?: Array<string>,
        options?: {}
    };
    displayedColumns: string[] = ['x', 'y', 'tsferY'];
    a;
    b;
    dataSource = this.dataXYs;
    constructor(private http: HttpClient) {
        // init chart
        this.chart = {
            title: '',
            type: 'ScatterChart',
            columnNames: ['', ''],
            data: [
                [0, 0]
            ],
            roles: []
        };
    }

    ngOnInit() {
        this.readExcel();
    }

    readExcel() {
        this.http.get('assets/hw1_data.csv', { responseType: 'text' })
            .subscribe(
                data => data.split('\n').map(arrayXY => {
                    this.dataXYs.push(this.arrayToData(arrayXY.split(',')));
                }),
                error => console.log(error),
                () => {
                    this.calculate();
                    this.drawChart();
                }
            );
    }

    arrayToData(arrayXY: string[]) {
        const data = new DataXY(
            +arrayXY[0],
            +arrayXY[1],
            +arrayXY[0],
            Math.log(+arrayXY[1]));
        console.log('x =', data.x, 'y =', data.y, 'transfer y =', data.tsferY);
        return data;
    }

    calculate() {
        const avgX = this.dataXYs
            .map(dataXY => dataXY.tsferX)
            .reduce((sum, current) => sum + current) / this.dataXYs.length;
        console.log('avg X :', avgX);
        const avgY = this.dataXYs
            .map(dataXY => dataXY.tsferY)
            .reduce((sum, current) => sum + current) / this.dataXYs.length;
        console.log('avg Y :', avgY);
        const b1 = this.dataXYs
            .map(dataXY => (dataXY.tsferX - avgX) * (dataXY.tsferY - avgY))
            .reduce((sum, current) => sum + current);
        const b2 = this.dataXYs
            .map(dataXY => Math.pow(dataXY.tsferX - avgX, 2))
            .reduce((sum, current) => sum + current);
        const b = b1 / b2;
        this.b = b;
        console.log('β :', this.b);
        const a = avgY - (b * avgX);
        this.a = Math.pow(Math.E, a);
        console.log('α :', this.a);
    }

    drawChart() {
        this.chart = {
            title: 'Scatter Chart',
            type: 'ScatterChart',
            columnNames: ['x', 'orignal dataset'],
            data: this.dataXYs.map(dataXY => [dataXY.x, dataXY.y]),
            roles: [],
            options: {
                title: 'Descendants by Generation',
                hAxis: { title: 'x', minValue: 0, maxValue: 20 },
                vAxis: { title: 'y', minValue: 0, maxValue: 20 },
                pointSize: 5,
                colors: ['black'],
                trendlines: {
                    0: {
                        type: 'exponential',
                        visibleInLegend: true,
                        color: 'red',
                    }
                }
            }
        };
    }
}

