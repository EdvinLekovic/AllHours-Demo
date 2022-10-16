import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Absence, AbsenceRequest } from 'src/app/models/absence';
import { AbsenceDefinition } from 'src/app/models/absence-definition';
import { User, UserRequest } from 'src/app/models/user';
import { AppService } from 'src/app/services/AppService.service';
import { TOKEN } from 'src/app/utils/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  public users!: User[];
  public filteredUsers!: User[];
  public searchString!: string;
  public error: boolean = false;
  public errorMessage: string = '';
  public userRequest: UserRequest = {
    FirstName: '',
    LastName: '',
    FullName: '',
    Email: ''
  };
  public absenceRequest: AbsenceRequest = {
    Comment: '',
    AbsenceDefinition: null,
    PartialTimeFrom: new Date(),
    PartialTimeTo: new Date()
  };
  public absenceDefinitions!: AbsenceDefinition[];
  public user!: User;

  constructor(private appService: AppService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(localStorage.getItem(TOKEN)){
      this.getUsers();
      this.getAbsenceDefinitions();
    }

  }

  public filterUsers() {
    this.filteredUsers = this.users;
    if (this.searchString) {
      this.filteredUsers = this.filteredUsers.filter(user =>
        user.FullName.toLowerCase().includes(this.searchString.toLowerCase()));
    }
  }

  public addNewEmployee() {
    this.userRequest.FullName = this.userRequest.FirstName + " " + this.userRequest.LastName;
    this.appService.getUsers().subscribe(users => {
      this.users = users;
      this.checkIfEmployeeCanBeAdd();
    })
  }

  public absenceUser(user: User) {
    this.user = user;
  }

  public addNewAbsence() {
    const absence: Absence = {
      UserId: this.user.Id,
      FirstName: this.user.FirstName,
      LastName: this.user.LastName,
      Timestamp: new Date(),
      Origin: 0,
      Comment: this.absenceRequest.Comment,
      AbsenceDefinitionId: this.absenceRequest.AbsenceDefinition?.Id,
      AbsenceDefinitionName: this.absenceRequest.AbsenceDefinition?.AbsenceDefinitionName,
      PartialTimeFrom: this.absenceRequest.PartialTimeFrom,
      PartialTimeTo: this.absenceRequest.PartialTimeTo,
      IsPartial: true,
      OverrideHolidayAbsence: false
    };

    this.appService.addNewAbsence(absence).subscribe(ab => {
      const closeModal = document.getElementById("close2") as HTMLButtonElement;
      closeModal.click();
    });

  }

  public removeError() {
    this.userRequest.FirstName = '';
    this.userRequest.LastName = '';
    this.userRequest.FullName = '';
    this.userRequest.Email = '';
    this.error = false;
    this.errorMessage = '';
  }

  private getAbsenceDefinitions() {
    this.appService.getAbsenceDefinitions().subscribe(absenceDefinitions => {
      this.absenceDefinitions = absenceDefinitions.map(ad => {
        const absenceDefinition: AbsenceDefinition = { Id: ad.Id, AbsenceDefinitionName: ad.Name };
        return absenceDefinition;
      });
    })
  }

  private checkIfEmployeeCanBeAdd() {
    const elements = this.users.filter(user =>
      user?.Email?.includes(this.userRequest.Email) ||
      user?.FullName?.includes(this.userRequest.FullName)).length > 0;
    if (elements) {
      this.error = true;
      this.errorMessage = "FirstName, LastName or Email exist please enter some new one";
      this.cdr.detectChanges();
      return;
    }

    if (this.userRequest.FirstName != '' &&
      this.userRequest.LastName != '' &&
      this.userRequest.Email != '') {
      this.error = false;
      this.appService.addUsers(this.userRequest).subscribe(ob => {
        const closeModal = document.getElementById("close") as HTMLButtonElement;
        closeModal.click();
        this.getUsers();
      });

    }
    else {
      this.errorMessage = "Please fill all fields";
      this.error = true;
    }
  }

  private getUsers() {
    this.appService.getUsers().subscribe(users => {
      this.users = users
      this.filteredUsers = this.users;
    });
  }

}
