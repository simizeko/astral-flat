let val;
let menu;
let orbitVal;
let modeVal;
let gridVal;
let colVal;
let gravVal;
let aoeVal;
let fpsVal;
let idleVal;
let mergeVal;
let midiOptions;
let midiModeVal;
let channelVal;
let lengthVal;
let midiOutputVal;
let midiInputVal;
let openMenu;
let testButton;

//////////////////////
//////////////////////

class Menu {
    constructor() {
        this.counterM = 0;

        this.bgFull;
        this.container;
        this.div;
        this.containerWidth = '50%';
        this.containerHeight = '100%';
        this.menuColour = '#1f1f1f';
        this.menuOpacity = '0.7';
        this.h1Size = '44pt';
        this.h2Size = '17pt';
        this.labelSize = '11pt';
        this.muteB;
        this.menuB;
        this.fullB;

        this.divWidth = '50%';
        this.divPos = 'left';
        this.buttonSize = 50;

        this.topDiv;
        this.h1;
        this.closeButton;
        this.buttonWidth = '36px';
        this.buttonPadding = '12px';
        this.buttonRadius = '0px';

        this.orbitSpeed = ['I', 'II', 'III'];
        this.mode = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
        this.modeLabel = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
        this.modeTitle;
        this.grid = ['Fade', 'On', 'Off'];
        this.display = ['Col.', 'Grav.', 'AOE', 'FPS'];
        this.fpsCounter;
        this.idle = [];
        this.midiMode = false;
        this.channels = ['1-8', '1', '2', '3'];
        this.lengthTitle;
        this.seconds;
        this.midiOutputs = WebMidi.outputs;
        this.midiInputs = WebMidi.inputs;
        this.noDevices = 'No midi devices detected'

        this.title = [];
        this.padding = '5%'
        this.paddingHalf = '2.5%'
        this.titleOptions = ['Orbit Speed', 'Mode', 'Grid', 'Display', 'Idle Rotation/Zoom', 'Midi Options'];

        this.muteAudio = false;
        this.hover = false;

        this.ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

        this.orbitButtons;
        this.modeButtons;
        this.gridButtons;
        this.displayButtons = [];
        this.idleButton;
        this.mergeButtonss
        this.midiButton;
        this.midiModeButton;
        this.channelButtons;
        this.lengthSlider
        this.outputDropdown;
        this.inputDropdown;
        this.backButton;

        this.gridOn = true;
        this.gridFade = true;

        // default selection
        openMenu = false;
        orbitVal = 'II';
        modeVal = 'IV';
        gridVal = 'Fade';
        colVal = true;
        gravVal = false;
        aoeVal = false;
        fpsVal = false;
        idleVal = 'On';
        mergeVal = 'On';
        midiOptions = false;
        midiModeVal = 'Off'
        channelVal = '1-8';
        lengthVal = 500;
    }


    Container() {
        // How wide the menu is based on screen size
        if (windowWidth < 1040) {
            this.containerWidth = '100%'
        } else { this.containerWidth = '50%' }

        // Backgrounds with opacity
        this.bgFull = createDiv(' ');
        this.bgFull.style('z-index: 0')
        this.bgFull.position(0, 0);
        this.bgFull.style('width: 100%');
        this.bgFull.style('height: 100%');
        this.bgFull.style('position: fixed');
        this.bgFull.style('background-color', this.menuColour);
        this.bgFull.style('opacity', this.menuOpacity);

        this.bgHalf = createDiv(' ');
        this.bgHalf.position(0, 0);
        this.bgHalf.style('width', this.containerWidth);
        this.bgHalf.style('height', this.containerHeight);
        this.bgHalf.style('position: fixed');
        this.bgHalf.style('background-color', this.menuColour);
        this.bgHalf.style('z-index', '98');

        // Space that the items will fill
        this.container = createDiv(' ')
        this.container.position(0, 0);
        this.container.style('z-index', '99');
        // this.container.style('background-color', this.menuColour);
        this.container.style('background: none');
        this.container.style('width', this.containerWidth);
        this.container.style('height', this.containerHeight);
        this.container.style('color: white'); // text colour
        this.container.style('font-family: hind');

        // Creates top bar container
        this.topDiv = createDiv(' ');
        this.topDiv.parent(this.container);
        this.topDiv.style('float: left');
        this.topDiv.style('width: 100%')
        this.h1 = createElement('h1', 'Options');
        this.h1.parent(this.topDiv);
        this.h1.style('padding-left', this.paddingHalf);
        this.h1.style('margin-top', this.paddingHalf);
        this.h1.style('margin-bottom', '0px');
        this.h1.style('float: left');
        this.h1.style('font-size', this.h1Size);
        this.h1.style('font-weight: 100');

        // close button
        this.closeButton = createButton('X').addClass('CB');
        this.closeButton.parent(this.topDiv);
        this.closeButton.style('float: right');
        this.closeButton.style('margin', this.paddingHalf);
        this.closeButton.style('margin-top', this.padding);
        this.closeButton.style('width', this.buttonWidth);
        this.closeButton.mouseReleased(this.MenuAccess);

        // Creates a menu item
        this.OrbitSpeed('Orbit Speed', 'red', this.orbitSpeed);
        this.Mode('', 'green', this.mode);
        this.Grid('Grid', 'hotpink', this.grid);
        this.Display('Display', 'orange', this.display);
        this.Idle('Idle Rotation / Zoom', 'cyan');
        this.MergePlanets('Collisions', 'red');
        this.ClearPlanets('Reset', 'yellow');
        this.Midi('Midi Options', 'purple');

        // Adds input stlyes to added items
        this.InputStyles();
    }

    // Background() {
    //     // Background with opacity
    //     this.bgFull = createDiv(' ');
    //     this.bgFull.style('z-index: 0')
    //     this.bgFull.position(0, 0);
    //     this.bgFull.size(windowWidth, windowHeight);
    //     this.bgFull.style('position: fixed');
    //     this.bgFull.style('background-color', this.menuColour);
    //     this.bgFull.style('opacity', this.menuOpacity);
    // }

    InputStyles() {
        let inputs = selectAll('input');

        // // Populating html IDs for inputs
        // for (let i = 0; i < inputs.length; i++) {
        //     this.ids.push(str(i + 1));
        // }
        // Radio Button styles

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].size(50, 50);
            inputs[i].style('margin: auto');
            inputs[i].style('margin-right', '5px');
            inputs[i].style('margin-bottom', '5px');
            // inputs[i].style('clip-path: circle(46% at 50% 50%)');
            inputs[i].style('appearance', 'none');
            inputs[i].style('border', '1px solid grey');
            inputs[i].style('cursor', 'pointer');
            // inputs[i].style('background', 'black');
            inputs[i].style('border-radius: 50%');
            // inputs[i].id(this.ids[i]);

        }

        // Button styles
        let butts = selectAll('.Butt');
        for (let i = 0; i < butts.length; i++) {
            // butts[i].style('margin-left', this.padding);
            // butts[i].style('margin-right', this.padding);
            butts[i].style('margin-bottom', '40px');
            // butts[i].style('width', '90%');
            butts[i].style('padding', this.buttonPadding);
            butts[i].style('border-radius', this.buttonRadius);
            butts[i].style('background', 'none');
            butts[i].style('color', 'white');
            butts[i].style('border', '1px solid white');
            butts[i].style('cursor: pointer');
        }

        // Label styles
        let labels = selectAll('label');
        for (let i = 0; i < labels.length; i++) {
            // labels[i].size(50, 50);
            labels[i].style('width: 50px');
            labels[i].style('background-color: brown');
            labels[i].style('background: none');
            labels[i].style('pointer-events: none');
            labels[i].style('font-size', this.labelSize);
            // labels[i].style('display: inline-block');
            labels[i].style('text-align: center');
            labels[i].style('position: absolute');
            labels[i].style('margin-left: -55px');
            labels[i].style('margin-top: 14px');
        }

        // Circle button styles
        let circleButtons = selectAll('.CB');
        for (let i = 0; i < circleButtons.length; i++) {
            circleButtons[i].style('aspect-ratio', '1 / 1');
            circleButtons[i].style('border-radius', '50%');
            // circleButtons[i].style('background: center');
            circleButtons[i].style('background-color', cc.bg);
            circleButtons[i].style('border: 1px solid grey');
            circleButtons[i].style('color: white');
            circleButtons[i].style('cursor: pointer');
        }

        // Return selected to (almost) default appearance
        let defaultS = selectAll('.defaultStyle');
        for (let i = 0; i < defaultS.length; i++) {
            defaultS[i].style('appearance: auto');
            defaultS[i].style('border', 'none');
            defaultS[i].style('width', '90%');
            defaultS[i].style('height', 'auto');
            defaultS[i].style('margin-left', this.padding);
            defaultS[i].style('margin-right', this.padding);
            defaultS[i].style('margin-bottom', this.padding);
        }
    }

    Active() {
        // Stores values for when menu closes
        orbitVal = this.orbitButtons.value();
        modeVal = this.modeButtons.value();
        gridVal = this.gridButtons.value();
        colVal = this.displayButtons[0].checked();
        gravVal = this.displayButtons[1].checked();
        aoeVal = this.displayButtons[2].checked();
        fpsVal = this.displayButtons[3].checked();
        idleVal = this.idleButton.value();
        mergeVal = this.mergeButtons.value();

        if (midiOptions) {
            midiModeVal = this.midiModeButton.value();
            midiOutputVal = this.outputDropdown.value();
            midiInputVal = this.inputDropdown.value();
            channelVal = this.channelButtons.value();
            lengthVal = this.lengthSlider.value();

            let seconds = map(lengthVal, 0, 8000, 0, 8);
            this.lengthTitle.html('Note Length: ' + seconds + 's');
        }


        if (gridVal === this.grid[0]) {
            this.gridOn = true;
            this.gridFade = true;
        }

        if (gridVal === this.grid[1]) {
            this.gridOn = true;
            this.gridFade = false;
        }

        if (gridVal === this.grid[2]) {
            this.gridOn = false;
            this.gridFade = false;
        }

        if (gravVal) {
            showGravity = true;
        } else {
            showGravity = false;
        }

        if (aoeVal) {
            showInfluence = true;
        } else {
            showInfluence = false;
        }

        if (idleVal == 'On') {
            rotate = true;
        } else {
            rotate = false;
        }

        if (mergeVal == 'On') {
            mergePlanets = true;
        } else {
            mergePlanets = false;
        }

        if (midiModeVal == 'On') {
            this.midiMode = true;
        } else {
            this.midiMode = false;
        }

        if (channelVal === this.channels[0]) {
            midi.outputAllChannels = true;
        }
        if (channelVal === this.channels[1]) {
            midi.outputAllChannels = false;
            midi.outputChannel = 1;
        }
        if (channelVal === this.channels[2]) {
            midi.outputAllChannels = false;
            midi.outputChannel = 2;
        }
        if (channelVal === this.channels[3]) {
            midi.outputAllChannels = false;
            midi.outputChannel = 3;
        }

        // Style for labels of checked inputs
        let L = selectAll(":checked + label");
        for (let j = 0; j < L.length; j++) {
            L[j].style('color: black');
        }

        // Style for labels of checked inputs
        let La = selectAll(":not(:checked) + label");
        for (let j = 0; j < La.length; j++) {
            La[j].style('color: white');
        }

        // Style for checked inputs
        let Ch = selectAll(":checked");
        for (let j = 0; j < Ch.length; j++) {
            Ch[j].style('background-color: white');
            Ch[j].style('border: none');
        }

        // Styles for not selected inputs
        let I = selectAll('input' + ':not(:checked)');
        for (let j = 0; j < I.length; j++) {
            I[j].style('background: none');
            I[j].style('border: 1px solid grey');
        }

        // Title change for mode
        this.modeTitle.html('Mode: ' + this.modeLabel[this.mode.indexOf(modeVal)]);
    }


    Update() {
        if (fpsVal) {
            let fpsText = (int(frameRate()));
            this.fpsCounter.html('fps: ' + fpsText);
        } else this.fpsCounter.html('');

        // Match circle button background to current background
        let circleButtons = selectAll('.CB');
        for (let i = 0; i < circleButtons.length; i++) {
            circleButtons[i].style('background-color', cc.bg);
        }
        if (menu.muteAudio) {
            menu.muteB.style('background-color', '#383838');
        }
    }


    OrbitSpeed(title, colour, options) {
        this.Item(title, colour);

        this.orbitButtons = createRadio('OS');
        for (let i = 0; i < options.length; i++) {
            this.orbitButtons.option(options[i]);
        }
        this.orbitButtons.parent(this.div);
        this.orbitButtons.style('margin-left', this.padding);
        this.orbitButtons.style('margin-right', this.padding);
        this.orbitButtons.style('margin-bottom', this.padding);
        this.orbitButtons.selected(orbitVal);
    }

    Mode(title, colour, options) {
        this.Item(title, colour, true);

        // Custom Title
        this.modeTitle = createElement('h2', 'Mode: ' + this.modeLabel[this.mode.indexOf(modeVal)]);
        this.modeTitle.parent(this.div);
        this.modeTitle.style('padding', this.padding);
        this.modeTitle.style('padding-top', '2.5%');
        this.modeTitle.style('margin', '0px');
        this.modeTitle.style('font-size', this.h2Size);
        this.modeTitle.style('font-weight: 100');

        this.modeButtons = createRadio('M');
        for (let i = 0; i < options.length; i++) {
            this.modeButtons.option(options[i]);
        }
        this.modeButtons.parent(this.div);
        this.modeButtons.style('margin-left', this.padding);
        this.modeButtons.style('margin-right', this.padding);
        this.modeButtons.style('margin-bottom', this.padding);
        this.modeButtons.selected(modeVal);
    }

    Grid(title, colour, options) {
        this.Item(title, colour);

        this.gridButtons = createRadio('G');
        for (let i = 0; i < options.length; i++) {
            this.gridButtons.option(options[i]);
        }
        this.gridButtons.parent(this.div);
        this.gridButtons.style('margin-left', this.padding);
        this.gridButtons.style('margin-right', this.padding);
        this.gridButtons.style('margin-bottom', this.padding);
        this.gridButtons.selected(gridVal);
    }

    Display(title, colour, options) {
        this.Item(title, colour);
        let boxDiv = createDiv(' ');
        boxDiv.parent(this.div);
        boxDiv.style('padding-left', this.padding);
        boxDiv.style('display: inline');

        for (let i = 0; i < options.length; i++) {
            this.displayButtons[i] = createCheckbox(options[i]);
            this.displayButtons[i].parent(boxDiv);
            this.displayButtons[i].style('margin-bottom', this.padding);
            this.displayButtons[i].style('display: inline-block');
        }
        this.displayButtons[0].checked(colVal);
        this.displayButtons[1].checked(gravVal);
        this.displayButtons[2].checked(aoeVal);
        this.displayButtons[3].checked(fpsVal);

    }

    Idle(title, colour, options) {
        this.Item(title, colour);

        // this.idleButton = createCheckbox('', idleVal);
        this.idleButton = createRadio('Idle');
        this.idleButton.parent(this.div);
        this.idleButton.option('On');
        this.idleButton.option('Off');
        this.idleButton.selected('On');
        this.idleButton.style('margin-left', this.padding);
        this.idleButton.style('margin-right', this.padding);
        this.idleButton.style('margin-bottom', this.padding);
    }

    MergePlanets(title, colour, options) {
        this.Item(title, colour);

        this.mergeButtons = createRadio('MP');
        this.mergeButtons.parent(this.div);
        this.mergeButtons.option('On');
        this.mergeButtons.option('Off');
        this.mergeButtons.selected('On');
        this.mergeButtons.style('margin-left', this.padding);
        this.mergeButtons.style('margin-right', this.padding);
        this.mergeButtons.style('margin-bottom', this.padding);
    }

    ClearPlanets(title, colour) {
        this.Item(title, colour);

        this.clearButton = createButton('Clear Planets').addClass('Butt');
        this.clearButton.parent(this.div);
        this.clearButton.style('width', '90%');
        this.clearButton.style('margin-left', this.padding);
        this.clearButton.style('margin-right', this.padding);
        this.clearButton.style('margin-bottom', this.padding);
        this.clearButton.style('padding', this.buttonPadding);
        this.clearButton.style('border-radius', this.buttonRadius);
        this.clearButton.mousePressed(DeleteAll);

        function DeleteAll() {
            planets.splice(0, planets.length);
        }
    }

    Midi(title, colour, options) {
        this.Item(title, colour);

        this.midiButton = createButton('>>>').addClass('Butt');
        this.midiButton.parent(this.div);
        this.midiButton.style('margin-left', this.padding);
        this.midiButton.style('margin-right', this.padding);
        this.midiButton.style('margin-bottom', this.padding);
        this.midiButton.style('width: 90%');
        this.midiButton.mousePressed(this.OpenMidiPage);
    }

    OpenMidiPage() {
        // Change title
        menu.h1.html('Midi Options');

        // Removes current item divs
        let allDivs = selectAll('.itemContainer');
        for (let i = 0; i < allDivs.length; i++) {
            allDivs[i].remove();
        }

        midiOptions = true;

        // Adds new items
        menu.MidiMode('Midi Mode', 'red');
        menu.Channels('Channels', 'green');
        menu.MidiLength('Note Length');
        menu.MidiOutput('Output Device', 'hotpink');
        menu.MidiInput('Input Device', 'yellow');

        // Back button
        this.backButton = createButton('< Back').addClass('Butt')
        this.backButton.parent(menu.container);
        this.backButton.style('width', '95%');
        // this.backButton.style('float: left');
        this.backButton.style('display: inline-block');
        this.backButton.style('margin-left', menu.paddingHalf);
        this.backButton.style('margin-top', '30px');
        this.backButton.style('padding', menu.buttonPadding);
        this.backButton.style('border-radius', menu.buttonRadius);
        this.backButton.mousePressed(menu.CloseMidiPage);

        menu.InputStyles();
    }

    CloseMidiPage() {
        // Removes whole container and backgrounds
        menu.container.remove();
        menu.bgFull.remove();
        menu.bgHalf.remove();

        // Creates new menu from start
        menu.Container();

        // Change title
        menu.h1.html('Options');

        midiOptions = false;
    }

    MidiMode(title, colour) {
        this.Item(title, colour);
        this.midiModeButton = createRadio('');
        this.midiModeButton.parent(this.div);
        this.midiModeButton.option('On');
        this.midiModeButton.option('Off');
        this.midiModeButton.selected(midiModeVal);
        this.midiModeButton.style('margin-left', this.padding);
        this.midiModeButton.style('margin-right', this.padding);
        this.midiModeButton.style('margin-bottom', this.padding);
    }

    Channels(title, colour) {
        this.Item(title, colour);
        this.channelButtons = createRadio('Ch');
        this.channelButtons.parent(this.div);
        for (let i = 0; i < this.channels.length; i++) {
            this.channelButtons.option(this.channels[i]);
        }
        this.channelButtons.style('margin-left', this.padding);
        this.channelButtons.style('margin-right', this.padding);
        this.channelButtons.style('margin-bottom', this.padding);
        this.channelButtons.selected(channelVal);
    }

    MidiLength(title, colour) {
        this.Item(title, colour, true);

        // Custom Title
        this.lengthTitle = createElement('h2', 'Note Length: ' + lengthVal + 's');
        this.lengthTitle.parent(this.div);
        this.lengthTitle.style('padding', this.padding);
        this.lengthTitle.style('padding-top', '2.5%');
        this.lengthTitle.style('margin', '0px');
        this.lengthTitle.style('font-size', this.h2Size);
        this.lengthTitle.style('font-weight: 100');

        this.lengthSlider = createSlider(100, 8000, lengthVal, 100).addClass('defaultStyle');
        this.lengthSlider.parent(this.div);
        this.lengthSlider.style('margin-left', this.padding);
        this.lengthSlider.style('margin-right', this.padding);
        this.lengthSlider.style('margin-bottom', this.padding);
    }

    MidiOutput(title, colour) {
        this.Item(title, colour);
        this.outputDropdown = createSelect();
        this.outputDropdown.parent(this.div);
        this.outputDropdown.style('margin-left', this.padding);
        this.outputDropdown.style('margin-right', this.padding);
        this.outputDropdown.style('margin-bottom', this.padding);

        if (WebMidi.outputs.length < 1) {
            this.outputDropdown.option(this.noDevices);
        } else {
            for (let i = 0; i < this.midiOutputs.length; i++) {
                this.outputDropdown.option(this.midiOutputs[i].name);
            }
        }
        this.outputDropdown.selected(midiOutputVal);
    }

    MidiInput(title, colour) {
        this.Item(title, colour);
        this.inputDropdown = createSelect();
        this.inputDropdown.parent(this.div);
        this.inputDropdown.style('margin-left', this.padding);
        this.inputDropdown.style('margin-right', this.padding);
        this.inputDropdown.style('margin-bottom', this.padding);

        if (WebMidi.inputs.length < 1) {
            this.inputDropdown.option(this.noDevices);
        } else {
            for (let i = 0; i < this.midiInputs.length; i++) {
                this.inputDropdown.option(this.midiInputs[i].name);
            }
        }

        if (midiInputVal == undefined && WebMidi.inputs.length >= 1) {
            let m = WebMidi.inputs.length - WebMidi.inputs.length + 1;
            this.inputDropdown.selected(this.midiInputs[m].name);
        } else {
            this.inputDropdown.selected(midiInputVal);
        }
    }

    //Global styles for menu items
    Item(title, colour, customTitle) {

        // Container for each menu item
        this.div = createDiv(' ').addClass('itemContainer');
        this.div.parent(this.container);
        this.div.style('width', this.divWidth);
        // this.div.style('background-color', colour);
        this.div.style('display: inline-block')
        this.div.style('float', this.divPos);
        // this.div.style('display: flex');

        // Horizontal line
        let hr = createElement('hr');
        hr.parent(this.div);
        hr.style('margin', this.padding);
        hr.style('margin-bottom', '0px');
        hr.style('border', '0.1px solid grey');

        // Item title
        if (!customTitle) {
            this.h2 = createElement('h2', title);
            this.h2.parent(this.div);
            this.h2.style('padding', this.padding);
            this.h2.style('padding-top', '2.5%');
            this.h2.style('margin', '0px');
            this.h2.style('font-size', this.h2Size);
            this.h2.style('font-weight: 100');
        }
    }

    MenuButtons() {
        this.menuB = createButton('').addClass('CB');
        this.menuB.size(this.buttonSize, this.buttonSize);
        this.menuB.position(20, windowHeight - this.buttonSize - 20);
        this.menuB.style('border-radius', '50%');
        this.menuB.style('background-image', menuWht);
        this.menuB.style('background-position: center');
        this.menuB.style('background-repeat: no-repeat');
        this.menuB.style('background-size: 20px');
        this.menuB.mousePressed(this.MenuAccess)

        this.muteB = createButton('').addClass('CB');
        this.muteB.size(this.buttonSize, this.buttonSize);
        this.muteB.position(this.buttonSize + 20 + 15, windowHeight - this.buttonSize - 20);
        this.muteB.style('border-radius', '50%');
        this.muteB.style('background-image', muteWht);
        this.muteB.style('background-position: center');
        this.muteB.style('background-repeat: no-repeat');
        this.muteB.style('background-size: 40px');
        this.muteB.mouseOver(this.PlanetOff);
        this.muteB.mouseOut(this.PlanetOn);
        this.muteB.mouseReleased(MuteAudio);

        function MuteAudio() {
            menu.muteAudio = !menu.muteAudio;
        }

        this.fullB = createButton('').addClass('CB');
        this.fullB.size(this.buttonSize, this.buttonSize);
        this.fullB.position(windowWidth - this.buttonSize - 20, windowHeight - this.buttonSize - 20);
        this.fullB.style('border-radius', '50%');
       
        if (!fullScrn) {
            this.fullB.style('background-image', fullOpen);
         } else {
            this.fullB.style('background-image', fullClose);
         }
        this.fullB.style('background-position: center');
        this.fullB.style('background-repeat: no-repeat');
        this.fullB.style('background-size: 20px');
        this.fullB.mouseOver(this.PlanetOff);
        this.fullB.mouseOut(this.PlanetOn);
        this.fullB.mouseReleased(MakeFullScreen);

        function MakeFullScreen() {
            let fs = fullscreen();
            fullscreen(!fs);
            fullScrn = !fullScrn;
        }

        this.InputStyles();
    }

    PlanetOff() {
        createPlanet = false;
    }

    PlanetOn() {
        createPlanet = true;
    }

    FpsCounter() {
        this.fpsCounter = createP('');
        this.fpsCounter.position(windowWidth - 50 - 15, 0);
        this.fpsCounter.style('font-family: hind');
        this.fpsCounter.style('text-align: right');
        this.fpsCounter.style('width: 50px');
        this.fpsCounter.style('color: white');
    }

    // close menu function
    Cooldown() {
        this.counterM++;
        if (this.counterM == 4) {
            createPlanet = true;
        }
    }

    MenuAccess() {
        if (openMenu) {
            menu.container.remove();
            menu.bgFull.remove();
            menu.bgHalf.remove();
            menu.counterM = 0;
        } else {
            menu.Container();
            createPlanet = false;
        }
        openMenu = !openMenu;
    }
}

