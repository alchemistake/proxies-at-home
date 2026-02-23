import { useSettingsStore } from "@/store/settings";
import { Label, Select, Button } from "flowbite-react";
import { ExportActions } from "../../LayoutSettings/ExportActions";
import { ToggleButtonGroup, AutoTooltip } from "../../common";
import { useMemo, useCallback } from "react";
import type { CardOption } from "@/types";
import { settingsToCuttingTemplate, downloadCuttingTemplate } from "@/helpers/exportCuttingTemplate";
import { CONSTANTS } from "@/constants/commonConstants";

const DECKLIST_ORDER_OPTIONS = [
    { id: 'displayed' as const, label: 'As Displayed' },
    { id: 'alpha' as const, label: 'Alphabetical' },
];

type Props = {
    cards: CardOption[];
};

export function ExportSection({ cards }: Props) {
    const pageWidth = useSettingsStore((state) => state.pageWidth);
    const pageHeight = useSettingsStore((state) => state.pageHeight);
    const pageUnit = useSettingsStore((state) => state.pageSizeUnit);
    const dpi = useSettingsStore((state) => state.dpi);
    const setDpi = useSettingsStore((state) => state.setDpi);
    const decklistSortAlpha = useSettingsStore((state) => state.decklistSortAlpha);
    const setDecklistSortAlpha = useSettingsStore((state) => state.setDecklistSortAlpha);

    // Settings for cutting template export
    const columns = useSettingsStore((state) => state.columns);
    const rows = useSettingsStore((state) => state.rows);
    const bleedEdge = useSettingsStore((state) => state.bleedEdge);
    const bleedEdgeWidth = useSettingsStore((state) => state.bleedEdgeWidth);
    const bleedEdgeUnit = useSettingsStore((state) => state.bleedEdgeUnit);
    const cardSpacingMm = useSettingsStore((state) => state.cardSpacingMm);
    const cardPositionX = useSettingsStore((state) => state.cardPositionX);
    const cardPositionY = useSettingsStore((state) => state.cardPositionY);
    const registrationMarksPortrait = useSettingsStore((state) => state.registrationMarksPortrait);

    const handleExportCuttingTemplate = useCallback(() => {
        const settings = settingsToCuttingTemplate(
            pageWidth,
            pageHeight,
            pageUnit,
            columns,
            rows,
            bleedEdge,
            bleedEdgeWidth,
            bleedEdgeUnit,
            cardSpacingMm,
            cardPositionX,
            cardPositionY,
            registrationMarksPortrait
        );
        downloadCuttingTemplate(settings);
    }, [
        pageWidth, pageHeight, pageUnit, columns, rows,
        bleedEdge, bleedEdgeWidth, bleedEdgeUnit,
        cardSpacingMm, cardPositionX, cardPositionY, registrationMarksPortrait
    ]);

    const maxSafeDpiForPage = useMemo(() => {
        const widthIn = pageUnit === "in" ? pageWidth : pageWidth / CONSTANTS.MM_PER_IN;
        const heightIn = pageUnit === "in" ? pageHeight : pageHeight / CONSTANTS.MM_PER_IN;
        return Math.floor(
            Math.min(
                CONSTANTS.MAX_BROWSER_DIMENSION / widthIn,
                CONSTANTS.MAX_BROWSER_DIMENSION / heightIn
            )
        );
    }, [pageWidth, pageHeight, pageUnit]);

    // Safari (desktop and mobile) has GPU memory limits that make 900/1200 DPI unreliable
    const isSafariLimited = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobileBrowser = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const availableDpiOptions = useMemo(() => {
        const maxDpi = isSafariLimited ? Math.min(maxSafeDpiForPage, 600) : maxSafeDpiForPage;
        const options: { label: string; value: number }[] = [];
        for (let i = 300; i <= maxDpi; i += 300) {
            options.push({ label: `${i}`, value: i });
        }

        if (maxDpi % 300 !== 0) {
            options.push({
                label: `${maxDpi} (Max)`,
                value: maxDpi,
            });
        }

        options.forEach((opt) => {
            if (opt.value === 300) opt.label = "300 (Fastest)";
            else if (opt.value === 600) opt.label = "600 (Fast)";
            else if (opt.value === 900) opt.label = "900 (Sharp)";
            else if (opt.value === 1200) opt.label = "1200 (High Quality)";
            else if (opt.value === maxDpi)
                opt.label = `${maxDpi} (Max)`;
            else opt.label = `${opt.value}`;
        });

        return options;
    }, [maxSafeDpiForPage, isSafariLimited]);

    return (
        <div className="space-y-4">
            {isMobileBrowser && (
                <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-300">
                    Exports are limited to 600 DPI on mobile due to device memory constraints. For higher quality, try exporting on a desktop browser.
                </div>
            )}
            {!isMobileBrowser && isSafariLimited && (
                <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-300">
                    Exports are limited to 600 DPI on Safari due to GPU memory constraints. For higher quality, try Chrome, Firefox, or Edge.
                </div>
            )}
            <ExportActions cards={cards} />
            <div>
                <Label>PDF Export DPI</Label>
                <Select
                    value={dpi}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setDpi(val);
                    }}
                >
                    {availableDpiOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </Select>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label>Copy Decklist Order</Label>
                </div>
                <ToggleButtonGroup
                    options={DECKLIST_ORDER_OPTIONS}
                    value={decklistSortAlpha ? 'alpha' : 'displayed'}
                    onChange={(val) => setDecklistSortAlpha(val === 'alpha')}
                />
            </div>

            <div className="flex items-center gap-2">
                <Button
                    color="gray"
                    onClick={handleExportCuttingTemplate}
                    className="flex-1"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Cutting Template (SVG)
                </Button>
                <AutoTooltip content="Export an SVG cutting template based on your current layout settings. Import this into Silhouette Studio for print & cut alignment. See setup requirements in the Guides section when registration marks are enabled." />
            </div>
        </div>
    );
}