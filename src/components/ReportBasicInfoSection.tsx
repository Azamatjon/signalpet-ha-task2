import ReportSection from "./ReportSection";
import AddressInfoSection from "./AddressInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import ParentDetailsSection from "./ParentDetailsSection";
import ReportFindings from "./ReportFindings";
import Image from "next/image";
import reportLogo from '../static/report-logo.png'
import {useTranslation} from "@/hooks/useTranslation";
import {ReportModel} from "@/models/report";

const styles = {
    container: {
        display: "flex",
        flexDirection: "row" as "row",
        width: "90%",
    },
    segmentContainer: {
        paddingTop: "2rem",
        paddingBottom: "2rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        width: "fit-content",
        textWrap: "nowrap" as "nowrap",
    },
    segmentTitle: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
    },
    segmentContent: {},
    segmentImg: {
        width: "8rem",
        height: "auto",
        gridColumn: 3,
        alignSelf: "center",
    },
};

const ReportBasicInfoSection = ({ reportData }: { reportData: ReportModel }) => {
    const { t } = useTranslation();
    return (
        <div>
            <ReportSection
                title={t.reportTitle}
                secondaryText={`${t.id}: ${reportData.id}`}
            >
                <div style={styles.container}>
                    <div
                        style={{
                            ...styles.segmentContainer,
                            borderRight: "1px solid #064c60",
                            paddingRight: "31%",
                        }}
                    >
                        <span style={styles.segmentTitle} translate="yes">
                            {t.service}:
                        </span>
                        <span style={styles.segmentContent}>SignalRAY</span>
                    </div>
                    <div style={styles.segmentContainer}>
                        <span style={styles.segmentTitle} translate="yes">
                            {t.date}:
                        </span>
                        <span style={styles.segmentContent}>01-01-1994</span>
                    </div>
                </div>
            </ReportSection>
            <ReportSection
                title={t.hospitalDetailsTitle}
                contentWrapperStyle={{
                    width: "100%",
                    justifyContent: "space-around",
                }}
            >
                <AddressInfoSection />
                <ContactInfoSection style={{ gridColumn: 2 }} />
                <Image
                    alt="report-logo"
                    src={reportLogo}
                    style={styles.segmentImg}
                />
            </ReportSection>
            <ReportSection title={t.patientDetailsTitle}>
                <ParentDetailsSection patientDetails={reportData.patientDetails} />
            </ReportSection>
            <ReportSection
                title={t.abnormalFindingsTitle}
                secondaryText={t.confidenceTitle}
            >
                <ReportFindings findings={reportData.abnormalFindings} isNormal={false} editable={true} />
            </ReportSection>
            <ReportSection
                title={t.normalFindingsTitle}
                secondaryText={t.confidenceTitle}
            >
                <ReportFindings findings={reportData.normalFindings} isNormal={true} editable={true} />
            </ReportSection>
        </div>
    );
};

export default ReportBasicInfoSection;
