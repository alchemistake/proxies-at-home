import { describe, it, expect } from 'vitest';
import { getEffectiveGlobalDarkenMode } from './imageSourceUtils';

describe('imageSourceUtils', () => {

    describe('getEffectiveGlobalDarkenMode', () => {
        it('should return none when globalDarkenMode is none', () => {
            expect(getEffectiveGlobalDarkenMode('none', 'scryfall', true, true, true)).toBe('none');
        });
        it('should return none when scryfall toggle is off for scryfall source', () => {
            expect(getEffectiveGlobalDarkenMode('darken-all', 'scryfall', false, true, true)).toBe('none');
        });
        it('should return mode when scryfall toggle is on for scryfall source', () => {
            expect(getEffectiveGlobalDarkenMode('darken-all', 'scryfall', true, true, true)).toBe('darken-all');
        });
        it('should return none when mpc toggle is off for mpc source', () => {
            expect(getEffectiveGlobalDarkenMode('contrast-edges', 'mpc', true, false, true)).toBe('none');
        });
        it('should return mode when mpc toggle is on for mpc source', () => {
            expect(getEffectiveGlobalDarkenMode('contrast-edges', 'mpc', true, true, true)).toBe('contrast-edges');
        });
        it('should return none when uploads toggle is off for upload-library source', () => {
            expect(getEffectiveGlobalDarkenMode('darken-all', 'upload-library', true, true, false)).toBe('none');
        });
        it('should return mode when uploads toggle is on for upload-library source', () => {
            expect(getEffectiveGlobalDarkenMode('darken-all', 'upload-library', true, true, true)).toBe('darken-all');
        });
        it('should return mode for unknown/null source', () => {
            expect(getEffectiveGlobalDarkenMode('contrast-full', null, true, true, true)).toBe('contrast-full');
        });
    });
});
