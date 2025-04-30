import Image from "next/image";
import logo from '../static/logo.png'
import {LocaleSwitcher} from "@/components/LocaleSwitcher";
import {useTranslation} from "@/hooks/useTranslation";
const styles = {
    container: {
        backgroundColor: "#064c60",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
        padding: "1rem",
        width: "100%",
    },
    logo: {
        width: "10rem",
        height: "auto",
        maxHeight: "2rem"
    },
    secondaryText: {
        color: "#fff",
    },
};

const ReportHeader = ({ translationLoading }: { translationLoading: boolean }) => {
    const { t } = useTranslation();
    return (
        <div style={styles.container}>
            <Image
                alt="Logo"
                src={logo}
                style={styles.logo}
            />
            <span style={styles.secondaryText} translate="yes">
                {t.instantPointOfCare}
            </span>

            <LocaleSwitcher translationLoading={translationLoading} />
        </div>
    );
};

export default ReportHeader;
