import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GameComponent} from 'src/app/components/game/game.component';
import {GameFormComponent} from 'src/app/components/game-form/game-form.component';

let appRoutes : Routes = [
		{path:'',component:GameComponent},
        {path:'add', component:GameFormComponent},
        {path:'edit/:id', component:GameFormComponent},
        {path:'**', component:GameComponent} 
    ]

export let appRoutingProviders :any[] = [];
export let routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
