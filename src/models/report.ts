import {PatientDetailsModel} from "@/models/patientDetails";
import {Findings} from "@/models/finding";

export interface ReportModel {
    id: number;
    patientDetails: PatientDetailsModel;
    abnormalFindings: Findings;
    normalFindings: Findings;
    analysisSummary: string;
}