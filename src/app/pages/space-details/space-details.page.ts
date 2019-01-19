import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.page.html',
  styleUrls: ['./space-details.page.scss'],
})
export class SpaceDetailsPage implements OnInit {

  workspace: any;
  space_id: number;
  constructor(
    private workspaceService: WorkspaceService,
    private activatedRoute: ActivatedRoute
    ){ 
      this.space_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    }

  ngOnInit() {
    this.workspaceService.getWorkspaceById(this.space_id).subscribe(data=>{ 
      this.workspace = data;
    });
   
    
  }

}
