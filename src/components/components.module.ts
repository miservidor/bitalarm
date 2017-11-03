import { NgModule } from '@angular/core';
import { Graph24Component } from './graph24/graph24';
import { Graph30dComponent } from './graph30d/graph30d';
import { Graph1yearComponent } from './graph1year/graph1year';
@NgModule({
	declarations: [Graph24Component,
    Graph30dComponent,
    Graph1yearComponent],
	imports: [],
	exports: [Graph24Component,
    Graph30dComponent,
    Graph1yearComponent]
})
export class ComponentsModule {}
