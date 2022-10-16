import { Component, OnInit } from '@angular/core';
import { Absence, AbsenceRequest } from 'src/app/models/absence';
import { AbsenceDefinition } from 'src/app/models/absence-definition';
import { AppService } from 'src/app/services/AppService.service';
import { TOKEN } from 'src/app/utils/constants';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
})
export class AbsencesComponent implements OnInit {

  public absences!: Absence[];
  public absenceDefinitions!: AbsenceDefinition[];
  public absence!: Absence;
  public absenceRequest: AbsenceRequest = {
    AbsenceDefinition: null,
    Comment: '',
    PartialTimeFrom: new Date(),
    PartialTimeTo: new Date()
  };

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getAbsenceDefinitions();
    this.getAbsences();
  }

  public editAbsenceInfo() {
    this.absence.AbsenceDefinitionId = this.absenceRequest.AbsenceDefinition?.Id;
    this.absence.AbsenceDefinitionName = this.absenceRequest.AbsenceDefinition?.AbsenceDefinitionName;
    this.absence.OverrideHolidayAbsence = true;
    this.absence.Comment = this.absenceRequest.Comment;

    this.appService.editAbsence(this.absence).subscribe(ab => this.getAbsences());
    const closeModal = document.getElementById("close") as HTMLButtonElement;
    closeModal.click();
  }

  public absenceUser(absence: Absence) {
    this.absence = absence;
  }

  private getAbsences() {
    if (localStorage.getItem(TOKEN)) {
      this.appService.getAbsences().subscribe(absences => {
        this.absences = absences;
      });
    }
  }

  private getAbsenceDefinitions() {
    this.appService.getAbsenceDefinitions().subscribe(absenceDefinitions => {
      this.absenceDefinitions = absenceDefinitions.map(ad => {
        const absenceDefinition: AbsenceDefinition = { Id: ad.Id, AbsenceDefinitionName: ad.Name };
        return absenceDefinition;
      });
    })
  }


}
