import { ToggleButtonGroup, type ToggleButtonGroupProps } from './ToggleButtonGroup';

import { ImageSource } from '../../db';

export type ArtSource = typeof ImageSource.Scryfall | typeof ImageSource.MPC | typeof ImageSource.UploadLibrary;

const SCRYFALL_OPTION = { id: ImageSource.Scryfall, label: 'Scryfall', highlightColor: '#431e3f' };
const MPC_OPTION = { id: ImageSource.MPC, label: 'MPC Autofill', highlightColor: 'rgb(76, 155, 232)' };

const ART_SOURCE_OPTIONS_BASE = [
    SCRYFALL_OPTION,
    MPC_OPTION,
];

const UPLOAD_LIBRARY_OPTION = { id: ImageSource.UploadLibrary, label: 'My Uploads', highlightColor: '#2d7a4f' };

type ArtSourceToggleProps = {
    value: ArtSource;
    onChange: (value: ArtSource) => void;
    reversed?: boolean;
    showUploadLibrary?: boolean;
} & Omit<ToggleButtonGroupProps<ArtSource>, 'options' | 'value' | 'onChange'>;

export function ArtSourceToggle({
    value,
    onChange,
    reversed = false,
    showUploadLibrary = false,
    ...rest
}: ArtSourceToggleProps) {
    const base = showUploadLibrary
        ? [...ART_SOURCE_OPTIONS_BASE, UPLOAD_LIBRARY_OPTION]
        : ART_SOURCE_OPTIONS_BASE;
    const options = reversed ? [...base].reverse() : base;
    return (
        <ToggleButtonGroup
            options={options}
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
}
