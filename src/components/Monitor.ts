// -- types ----------------------------------------------------------------------------------------

import { TAppLanguage, TAppTheme } from '../@types/config';
import {
    IMonitor,
    IPalette,
    IMenu,
    IBlockSize,
    IArtboardManager,
    IArtboard,
} from '../@types/monitor';

import { collectAppLanguages, collectBrickSizes } from '../utils/config';

// -- PaletteBlocks defination ---------------------------------------------------------------------
const blockList: { [button: string]: (string | { [button: string]: string[] })[] } = {};
const lowShelf1: { [button: string]: string[] } = {};
const lowShelf2: { [button: string]: string[] } = {};

lowShelf1.block1 = ['block1', 'block2', 'block3', 'block4', 'block5'];
lowShelf2.block2 = ['block11', 'block21', 'block31', 'block41', 'block51'];

blockList.rhythm = ['note', 'note value drum', 'silence', 'note value', lowShelf1, lowShelf2];
blockList.meter = [
    'beats per second',
    'master beats per second',
    'on every note do',
    'notes played',
    'beat count',
    lowShelf1,
    lowShelf2,
];

blockList.pitch = [
    'pitch',
    'pitch G4',
    'scalar step (+/-)',
    'pitch number',
    'hertz',
    'fourth',
    'fifth',
    'pitch in hertz',
    'pitch number',
    'scalar change in pitch',
    'change in pitch',
    lowShelf1,
    lowShelf2,
];

blockList.flow = ['repeat', 'forever', 'if then', 'if then else', 'backward', lowShelf1, lowShelf2];

blockList.graphics = [
    'forward',
    'back',
    'left',
    'right',
    'set xy',
    'set heading',
    'arc',
    'scroll xy',
    'x',
    'y',
    'heading',
    lowShelf1,
    lowShelf2,
];

// -- subcomponent definitions ---------------------------------------------------------------------

/**
 * Class representing the Palette subcomponent proxied by the Monitor component.
 */
class Palette implements IPalette {
    /**
     * Fetches the list of palette sections and returns it.
     *
     * @returns `Promise` instance corresponding to the list of palette sections.
     */
    getSections(): Promise<string[]> {
        // dummy logic
        const fetchPaletteSections = () => {
            return new Promise<string[]>((res) => setTimeout(() => res(['Music', 'Logic', 'Art'])));
        };
        return fetchPaletteSections();
    }

    /**
     * Fetches the list of paletteSubSection and returns it.
     *
     * @returns `Promise` instance corresponding to the subSection list of the selected palette.
     */
    getSubSection(index: number): Promise<string[]> {
        // dummy logic
        const fetchSubSections = (i: number) => {
            if (i === 0) {
                return new Promise<string[]>((res) =>
                    setTimeout(() =>
                        res([
                            'rhythm',
                            'meter',
                            'pitch',
                            'Intervals',
                            'Tone',
                            'Ornament',
                            'Volume',
                            'Drum',
                            'Widgets',
                        ]),
                    ),
                );
            } else if (i === 1) {
                return new Promise<string[]>((res) =>
                    setTimeout(() =>
                        res([
                            'flow',
                            'action',
                            'boxes',
                            'number',
                            'boolean',
                            'heap',
                            'dictionary',
                            'extras',
                            'program',
                            'myblocks',
                        ]),
                    ),
                );
            } else if (i === 2) {
                return new Promise<string[]>((res) =>
                    setTimeout(() => res(['graphics', 'pen', 'media', 'sensors', 'ensemble'])),
                );
            } else {
                return new Promise<string[]>((res) => setTimeout(() => res([])));
            }
        };

        return fetchSubSections(index);
    }

    /**
     * Fetches the list of blocksList according to their subSection and returns it.
     *
     * @returns `Promise` instance corresponding to the Blocklist of the selected subSection.
     */
    getBlockList(subSection: string): Promise<(string | { [button: string]: string[] })[]> {
        // dummy logic
        const fetchBlockList = (section: string) => {
            return new Promise<(string | { [button: string]: string[] })[]>((res) =>
                setTimeout(() => res(blockList[section])),
            );
        };
        return fetchBlockList(subSection);
    }
}

/**
 * Class representing the Artboard subcomponent proxied by the Monitor component.
 */
class Artboard implements IArtboard {
    clean = () => {
        // clean the artwork on the artboard
    };
}

/**
 * Class representing the Menu subcomponent proxied by the Monitor component.
 */
class Menu implements IMenu {
    setTheme!: (theme: TAppTheme) => void;
    setLanguage!: (language: TAppLanguage) => void;
    setHorizontalScroll!: (horizontalScroll: boolean) => void;
    setTurtleWrap!: (turtleWrap: boolean) => void;
    setBrickSize!: (value: number) => void;

    setMasterVolume!: (masterVolume: number) => void;

    fetchLanguages(): Promise<{ code: TAppLanguage; name: string }[]> {
        return collectAppLanguages();
    }
    fetchBrickSizes(): Promise<{ value: number; label: string }[]> {
        return collectBrickSizes();
    }

    play(): void {
        console.log('play');
    }
    playSlowly(): void {
        console.log('play slowly');
    }
    playStepByStep(): void {
        console.log('play step by step');
    }
    hideBricks(): void {
        console.log('hide bricks');
    }
    showBricks(): void {
        console.log('show bricks');
    }
    foldBricks(): void {
        console.log('fold clamps');
    }
    unfoldBricks(): void {
        console.log('unfold clamps');
    }
    cleanArtboards(): void {
        console.log('clean artboards');
    }
    undo(): void {
        console.log('undo');
    }
    redo(): void {
        console.log('redo');
    }

    /**
     * Fetches the list of languages and returns it.
     *
     * @returns 'Promise' instance corresponding to the list of languages available.
     */
    getLanguages(): Promise<string[]> {
        const fetchLanguages = () => {
            return new Promise<string[]>((res) =>
                setTimeout(() => res(['English', 'português', '日本語', 'हिंदी', 'عربى'])),
            );
        };
        return fetchLanguages();
    }

    /**
     * Fetches the list of the block sizes and their corresponding labels and returns it.
     *
     * @returns 'Promise' instance corresponding to the list of block sizes and their labels.
     */
    getBlockSizes(): Promise<IBlockSize[]> {
        const fetchBlockSizes = () => {
            return new Promise<IBlockSize[]>((res) =>
                setTimeout(() =>
                    res([
                        {
                            label: 'Small',
                            size: 1,
                        },
                        {
                            label: 'Normal',
                            size: 1.5,
                        },
                        {
                            label: 'Medium',
                            size: 2,
                        },
                        {
                            label: 'Large',
                            size: 3,
                        },
                        {
                            label: 'Very Large',
                            size: 4,
                        },
                    ]),
                ),
            );
        };
        return fetchBlockSizes();
    }

    /**
     * Updates the block size state in the Context API
     *
     * @param blockSize the block size selected from the menu
     */
    changeBlockSize = (blockSize: number) => {
        blockSize;
    };

    /**
     * Updates the horizontalScroll state in the Context API
     *
     * @param isEnabled the horizontalScroll state selected from the menu
     */
    updateHorizontalScroll = (isEnabled: boolean) => {
        isEnabled;
    };

    /**
     * Updates the turtleWrap state in the Context API
     *
     * @param isWrapOn the turtleWrap state selected from the menu
     */
    updateTurtleWrap = (isWrapOn: boolean) => {
        isWrapOn;
    };

    /**
     * Updates the master volume state in the Context API
     *
     * @param volume the volume state set from the menu
     */
    updateVolume = (volume: number) => {
        volume;
    };

    hideBlocks = () => {
        // hide the blocks in the project
    };

    cleanArtwork = () => {
        // clean the artwork of the project
    };

    collapseBlocks = () => {
        // collapse the collapsible blocks
    };
}

/**
 * Class representing the Manager subcomponent proxied by the Monitor component.
 */
class ArtboardManager implements IArtboardManager {
    /** enable horizontal scrolling in the artboards*/
    enableHorizontalScroll = (isEnabled: boolean) => {
        isEnabled;
    };

    enableTurtleWrap = (isWrapOn: boolean) => {
        isWrapOn;
    };

    playArtboard = (id: number) => {
        id;
    };

    stopArtboard = (id: number) => {
        id;
    };

    removeArtboard = (id: number) => {
        id;
    };

    addArtboard = (id: number, x: number, y: number, angle: number) => {
        [id, x, y, angle];
    };
}

// -- component definition -------------------------------------------------------------------------

/**
 * Class representing the Monitor component.
 *
 * @description The Monitor component is the supervisor background component on the client side.
 */
class Monitor implements IMonitor {
    /** Instance of the Palette component. */
    private _palette: Palette;
    /** Instance of the Menu component. */
    private _menu: Menu;
    /** Instance of the Artboard component. */
    private _artboard: Artboard;
    private _manager: ArtboardManager;

    constructor() {
        this._palette = new Palette();
        this._menu = new Menu();
        this._artboard = new Artboard();
        this._manager = new ArtboardManager();
    }

    /** Getter for the palette component. */
    get palette(): Palette {
        return this._palette;
    }

    /** Getter for the menu component. */
    get menu(): Menu {
        return this._menu;
    }

    /** Getter for the artboard component. */
    get artboard(): Artboard {
        return this._artboard;
    }

    get manager(): ArtboardManager {
        return this._manager;
    }

    registerUpdateScroll(updateHorizontalScroll: (isEnabled: boolean) => void): void {
        this._menu.updateHorizontalScroll = updateHorizontalScroll;
    }

    registerUpdateWrap(updateTurtleWrap: (isWrapOn: boolean) => void): void {
        this._menu.updateTurtleWrap = updateTurtleWrap;
        // this._manager.enableTurtleWrap (isWrapOn);
    }

    registerSetBlockSize(changeBlockSize: (blockSize: number) => void): void {
        this._menu.changeBlockSize = changeBlockSize;
    }

    registerUpdateVolume(updateVolume: (vol: number) => void): void {
        this._menu.updateVolume = updateVolume;
    }

    registerArtboardClean(clean: () => void): void {
        this._artboard.clean = clean;
    }

    registerClean(): void {
        /*
            connecting the menu to the artboard for clean functionality by
            setting the clean Artwork method of the menu to the clean method of the artboard
        */
        this._menu.cleanArtwork = this._artboard.clean;
    }

    registerRemoveArtboard(removeArtboard: (id: number) => void): void {
        this._manager.removeArtboard = removeArtboard;
    }

    registerPlayArtboard(playArtboard: (id: number) => void): void {
        this._manager.playArtboard = playArtboard;
    }

    registerStopArtboard(stopArtboard: (id: number) => void): void {
        this._manager.stopArtboard = stopArtboard;
    }

    registerAddArtboard(
        addArtboard: (id: number, x: number, y: number, angle: number) => void,
    ): void {
        this._manager.addArtboard = addArtboard;
    }
}

// -- component instance ---------------------------------------------------------------------------

export default new Monitor();
