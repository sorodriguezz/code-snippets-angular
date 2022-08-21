import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnippetsService } from 'src/app/services/snippets/snippets.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public snippets: any;
  public snippet: any;

  constructor(
    private snippetsService: SnippetsService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getSnippetsService();
  }

  open(content: any, snippet: any) {
    this.snippet = snippet;

    this.modalService.open(
      content, 
      { 
        size: 'xl',
        centered: true,
        backdrop: 'static',
        keyboard: false
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getSnippetsService() {
    this.snippetsService.getAllSnippets().subscribe({
      next: (snippets: any) => {
        this.snippets = snippets;
      }
    })
  }
  


}
