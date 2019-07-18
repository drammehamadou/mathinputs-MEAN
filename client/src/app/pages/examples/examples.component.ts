import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'cae-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {

  stickyEnabled: boolean = true;

  isMenuCollapsed: boolean = false;
  isCollapsed: boolean = false;
  titles: Array<string> = [];

  userDetails;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router ) {
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map( (event: ActivationEnd) => event.snapshot)
      )
      .subscribe(root => {
        this.titles = [];
        this.getTitles(root);
      });
  }

  ngOnInit() {
    {
      this.onResize(null);
    }
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.stickyEnabled = window.innerWidth > 992;
  }

  private getTitles(node: ActivatedRouteSnapshot) {
    const title = node.data['title'];

    if (title)
      this.titles.push(title);

    if (!node.firstChild)
      return;

    this.getTitles(node.firstChild);
  }

}
