import { CSSProperties, useEffect, useState } from "react";
import InputTag from "./InputTag";
import { PatientDetailsModel } from "@/models/patientDetails";
import {useTranslation} from "@/hooks/useTranslation";
import {TranslationKeys} from "@/translations";

const styles = {
    container: {
        display: "inline-grid",
        gridTemplateColumns: "1fr 1fr",
        width: "98%",
        paddingLeft: "2%",
        paddingBottom: "2%",
    },
    detailContainer: {},
    detailTitle: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
    },
};

interface ParentDetailsSectionInterface {
    patientDetails: PatientDetailsModel;
    style?: CSSProperties;
}

const ParentDetailsSection = (props: ParentDetailsSectionInterface) => {
    const { patientDetails, style } = props;
    console.log('patientDetails', patientDetails)

    const { t } = useTranslation();
    return (
        <div style={{ ...styles.container, ...style }}>
            {Object.keys(patientDetails).map((field) => (
                <div key={field} style={styles.detailContainer}>
                        <span style={styles.detailTitle} translate="yes">
                            {t[field as TranslationKeys]}
                        </span>
                    <InputTag>
                        {patientDetails[field as keyof typeof patientDetails]}
                    </InputTag>
                </div>
            ))}
        </div>
    );
};

export default ParentDetailsSection;
