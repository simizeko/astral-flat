


class MidiOut {
    constructor() {
        this.showOutput = [];
        this.activeOutput = 0;
        this.showInput = [];
        this.activeInput = 0;
        this.activeMidi;
        this.outputAllChannels = true;
        this.outputChannel = 1;
        // this.activeChannel1 = this.activeOutput
        this.showMidi;
        this.midiCounter = 0;

    }


    setup() {
        WebMidi
            .enable({ sysex: true })
            .then(onEnabled)
            .catch(err => alert(err));

        function onEnabled() {

            // Outputs
            if (WebMidi.inputs.length < 1 && WebMidi.outputs.length < 1) {
                console.log('No midi device detected');
                midiDevice = false;
            } else {
                WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
                WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));
            }
        }

    }

    listOuts() {
        // this.activeMidi = WebMidi.outputs[this.activeOutput];

        // this.showOutput = [WebMidi.outputs[midi.activeOutput]];
        // this.showInput = [WebMidi.inputs[midi.activeInput]];

        if (WebMidi.inputs.length < 1 && WebMidi.outputs.length < 1) {
            midiDevice = false;
        } else {
            midiDevice = true;
        }

        // if (options.midiMode) {
        //     options.midiList = this.showOutput;
        // } else { options.midiList = 'Midi Options' }

        // if (options.midiOut === true) {
        //     options.midiOutList = this.showOutput;
        // } else { options.midiOutList = 'Midi Out' }

        // push();
        // fill(0, 255, 0);
        // textFont(debug);
        // textSize(24);
        // this.showOutput.forEach(output => text(output.name, -200, -200));
        // this.showInput.forEach(output => text(output.name, -200, 200));

        // console.log(this.showOutput);
        // WebMidi.outputs.forEach(output => text(output.name, -100, -100));
        // pop();
    }


    midiListen() {

        this.midiCounter++;
        let midiCounterPast = this.midiCounter - 1;
        if (this.midiCounter === 0) {
            midiCounterPast = 0;
        }
        // console.log(this.midiCounter);

        let input = WebMidi.getInputByName(menu.inputDropdown.selected());
        // let channelIn = input.channels[1];
        input.addListener("noteon", e => {
            let l = 'CDEFGAB';
            let n = e.note.identifier.substring(0, 1);
            let m = match(l, n);
            if (midiCounterPast < this.midiCounter && createPlanet) {
                this.midiCreate(m.index + 1);
            }
            // print(n);
            // console.log(e.note.identifier, e.message.channel);
        })
        // print(midi.showInput);
        // print(menu.inputDropdown.selected())
    }

    midiCreate(size) {

        center = createVector(0, 0);
        let newPlanet = new Planets(random(-width / 2 + 100, - sun.radius), 0, size, center);
        newPlanet.attachSounds(new Sounds(newPlanet));
        planets.push(newPlanet);
        this.midiCounter = 0;

    }
}
