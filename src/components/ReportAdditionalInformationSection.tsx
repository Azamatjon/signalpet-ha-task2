import InputTag from "./InputTag";
import {useTranslation} from "@/hooks/useTranslation";

const styles = {
    title: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
        alignSelf: "center",
        justifyCenter: "center",
        alignText: "center",
    },
};

const ReportAdditionalInformationSection = ({ analysisSummary }: { analysisSummary?: string }) => {
    const { t } = useTranslation();
    console.log('sdsdsdsdsd', analysisSummary)
    return (
        <div translate="yes">
            <span style={styles.title}>{t.summary}:</span>
            <InputTag editable={true}>{analysisSummary}</InputTag>
        </div>
    );
};

export default ReportAdditionalInformationSection;
