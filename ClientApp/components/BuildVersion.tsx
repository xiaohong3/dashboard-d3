import * as React from "react";
interface IProps {
    buildVersions: string[] | null;
    onBuildVersionChange: (selectedVersion: string) => void;
}
export class BuildVersion extends React.Component<IProps, {}> {
    render() {
        const { buildVersions, onBuildVersionChange } = this.props;

        return <select onChange={e => onBuildVersionChange(e.currentTarget.value)}>
            <option value="">Select build version</option>
            {!buildVersions ? null :
            buildVersions.map(bV => <option key={bV} value={bV}>{bV}</option>)}
        </select>
    }
}