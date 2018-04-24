import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { ArmeService } from '../arme.service';
import { Arme } from '../model';
import { NgForm } from '@angular/forms';
import { ArmesComponent } from '../armes/armes.component';

@Component({
  selector: 'app-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: ['./arme-detail.component.css']
})
export class ArmeDetailComponent implements OnInit {


  armeId: number;
  arme = new Arme(); // objet

  constructor(
    private armeComponent: ArmesComponent,
    private route: ActivatedRoute,
    private router: Router,
    private armeService: ArmeService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log( params.get('id'));
      this.armeId = +this.route.snapshot.paramMap.get('id');

      this.armeService
      .getArme(this.armeId)
      .subscribe(
        arme => (this.arme = arme),
     );
    });
  }

  deleteArme() {
    this.armeService.deleteArme(this.arme.id).subscribe(
      () => {
        this.router.navigate(['../../'], {
          relativeTo: this.route
        });
      },
      err => {
        console.log(err);
      }
    );
  }


updateArme(form: NgForm) {
  console.log(this.arme);
  this.armeService.updateArme(this.arme).subscribe(
    () => {
      this.armeComponent.ngOnInit();
      this.router.navigate(['/arme'], {
      });
    },
  );

}

}
