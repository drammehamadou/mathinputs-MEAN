import { Component, OnInit } from '@angular/core';
import { ParagraphTree, ParagraphTreeService } from "../../services/paragraph-tree/paragraph-tree.service";
import { debounce } from "rxjs/operators";
import { timer } from "rxjs";

@Component({
  selector: 'cae-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss']
})
export class TableOfContentsComponent implements OnInit {

  private paragraphTree: ParagraphTree = null;

  constructor(private ptService: ParagraphTreeService) { }

  ngOnInit() {
    this.ptService.updates()
      .pipe(
        debounce(() => timer(250))// wait a bit for the paragraph tree to settle
      )
      .subscribe(paragraphTree => this.paragraphTree = paragraphTree);
  }

}
