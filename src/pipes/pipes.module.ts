import { NgModule } from '@angular/core';
import { PipesRoundPipe } from './pipes-round/pipes-round';
import { JsdatePipe } from './jsdate/jsdate';
@NgModule({
	declarations: [PipesRoundPipe,
    JsdatePipe],
	imports: [],
	exports: [PipesRoundPipe,
    JsdatePipe]
})
export class PipesModule {}
