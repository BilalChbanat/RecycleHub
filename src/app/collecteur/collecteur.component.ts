import { Component, OnInit } from '@angular/core';
import { CollecteurService } from '../services/collecteur-service/collecteur.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-collecteur',
  templateUrl: './collecteur.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./collecteur.component.css']
})
export class CollecteurComponent implements OnInit {
  requests: any[] = [];
  userLocation: string = '';


  constructor(private collecteurService: CollecteurService) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userLocation = currentUser.address;

    this.collecteurService.getRequests().subscribe((requests) => {
      this.requests = this.filterRequests(requests);
    });
  }

  getWasteTypes(wastes: any): string[] {
    return Object.keys(wastes).filter(type => wastes[type].selected);
  }

  filterRequests(requests: any[]): any[] {
    return requests.filter(request =>
      request.address.includes(this.userLocation) &&
      request.status === 'en attente'
    );
  }

  acceptRequest(request: any): void {
    request.status = 'acceptée';
    this.collecteurService.updateRequest(request).subscribe();
  }

  rejectRequest(request: any): void {
    request.status = 'rejetée';
    this.collecteurService.updateRequest(request).subscribe();
  }

}
