import { ImageSource } from '../db';
import { DarkenMode } from '../../../shared/types';

/**
 * Decides what the effective global darken mode is for a specific image source.
 * It applies global darken Mode if the source toggle allows it.
 */
export function getEffectiveGlobalDarkenMode(
    globalDarkenMode: typeof DarkenMode[keyof typeof DarkenMode],
    source: ImageSource | null,
    applyToScryfall: boolean,
    applyToMpc: boolean,
    applyToUploads: boolean
): typeof DarkenMode[keyof typeof DarkenMode] {
    if (!globalDarkenMode || globalDarkenMode === DarkenMode.None) return DarkenMode.None;

    if (source === ImageSource.Scryfall && !applyToScryfall) return DarkenMode.None;
    if (source === ImageSource.MPC && !applyToMpc) return DarkenMode.None;
    if (source === ImageSource.UploadLibrary && !applyToUploads) return DarkenMode.None;

    return globalDarkenMode;
}
