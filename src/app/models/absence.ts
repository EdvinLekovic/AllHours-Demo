import { AbsenceDefinition } from "./absence-definition"

export type Absence = {
    Id?: string,
    UserId: string,
    FirstName:string,
    LastName:string,
    Timestamp:Date | string,
    Comment:string,
    Origin: number,
    IsPartial:boolean,
    OverrideHolidayAbsence:boolean,
    AbsenceDefinitionId:string | undefined,
    AbsenceDefinitionName: string | undefined,
    PartialTimeFrom: Date,
    PartialTimeTo: Date,
    IsModified?: boolean,
    ModifiedOn?: Date
}

export type AbsenceRequest = {
    AbsenceDefinition: AbsenceDefinition | null,
    Comment: string,
    PartialTimeFrom: Date,
    PartialTimeTo: Date
}