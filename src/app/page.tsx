import {Report} from "@/components/Report";
import {ReportModel} from "@/models/report";
import {generateReport} from "@/utils/reportGenerator";

export default async function ReportPage() {
    const report: ReportModel = await generateReport();
    return <Report data={report} />;
}