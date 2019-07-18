import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScrollSpyService } from "../../directives/scroll-spy/scroll-spy.service";
import { Node } from "../../services/paragraph-tree/paragraph-tree.service";

@Component({
  selector: 'cae-table-of-contents-group',
  templateUrl: './table-of-contents-group.component.html',
  styleUrls: ['./table-of-contents-group.component.scss']
})
export class TableOfContentsGroupComponent implements OnInit {

  @Input('node') node: Node;

  visible: boolean = false;
  url: string = "";

  constructor(private router: Router,
              private scrollSpyService: ScrollSpyService) {
  }

  ngOnInit() {
    this.url = this.router.url;
    this.visible = this.url.includes(this.node.name);

    this.scrollSpyService.observe()
      .subscribe(visibility => {
        if (this.node.name === visibility[0]) {
          this.visible = visibility[1];
        }
      });
  }

  getLink() {
    let url = this.url;
    const idx = url.indexOf('#');
    if (idx !== -1) {
      url = url.slice(0, idx);
    }

    return `${url}#${this.node.name}`;
  }
}
