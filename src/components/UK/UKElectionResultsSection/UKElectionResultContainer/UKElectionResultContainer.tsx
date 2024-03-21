import UKGeneral2010Map from "../../../maps/UKGeneral2010Map";
import ElectionResultContainer from "../../../shared/ElectionResultContainer/ElectionResultContainer";

export default function UKElectionResultContainer( { election } : { election: string } ){
    return (
        <ElectionResultContainer>
            <UKGeneral2010Map />
        </ElectionResultContainer>
    )
}