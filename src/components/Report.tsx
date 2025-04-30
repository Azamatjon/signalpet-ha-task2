'use client';

import {ReportModel} from "@/models/report";
import ReportHeader from "./ReportHeader";
import ReportPage from "@/components/ReportPage";
import ReportBasicInfoSection from "@/components/ReportBasicInfoSection";
import ReportSection from "@/components/ReportSection";
import ReportAdditionalInformationSection from "@/components/ReportAdditionalInformationSection";
import { useTranslation } from "@/hooks/useTranslation";
import {useTranslateReport} from "@/services/translateReport";

const styles = {
    wrapper: {
        backgroundColor: "#052e39",
        backdropFilter: "blur(2rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" as "column",
        gapY: "2rem",
        height: "95%",
    },
};

export function Report({ data }: { data: ReportModel }) {
    const { t } = useTranslation();
    const { translatedReport, loading, error } = useTranslateReport(data);

    console.log('data', data, error)

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <ReportHeader translationLoading={loading} />
                <ReportPage>
                    <ReportBasicInfoSection reportData={translatedReport!} />
                </ReportPage>
                <ReportPage>
                    <ReportSection title={t.additionalInformation}>
                        <ReportAdditionalInformationSection analysisSummary={translatedReport?.analysisSummary} />
                    </ReportSection>
                </ReportPage>
            </div>
        </div>
    );
}

