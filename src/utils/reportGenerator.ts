import {Findings} from "@/models/finding";
import {selectRandomObjects} from "@/utils/objects";
import {readDummyFile} from "@/utils/fileReader";
import {getRandomNumberInRange} from "@/utils/numbers";
import {generateXrayAnalysisSummary, randomXrayFinding} from "@/utils/strings";
import {PatientDetailsModel} from "@/models/patientDetails";
import {randomInt} from "node:crypto";

const getFindings = async (
    isNormal: boolean,
    quantityRange: [number, number],
    generatedQuantityRange: [number, number]
): Promise<Findings> => {
    let localFindings: Findings = [];
    localFindings = localFindings.concat(
        selectRandomObjects(
            await readDummyFile<Findings>(isNormal
                ? "fetchNormalFindings.json"
                : "fetchAbnormalFindings.json"),
            getRandomNumberInRange(...quantityRange)
        )
    );

    for (
        let i = 0;
        i < getRandomNumberInRange(...generatedQuantityRange);
        i++
    ) {
        localFindings = localFindings.concat(randomXrayFinding(isNormal));
    }
    return localFindings;
};

export const generateReport = async ()=>  {
    const id = randomInt(1, 999)
    const abnormalFindings = await getFindings(false, [0, 7], [0, 5])
    const normalFindings = await getFindings(true, [0, 7], [0, 5])
    const patientDetails = (await readDummyFile<{[key: string]: PatientDetailsModel}>('fetchPatientDetails.json'))['9']
    const analysisSummary = generateXrayAnalysisSummary()
    return { id, patientDetails, abnormalFindings, normalFindings, analysisSummary }
}