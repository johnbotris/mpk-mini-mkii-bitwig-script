const TRANSPORT = {};
const REMOTE_CONTROLS = {};
const TRACK = {};

/*
 * The function given to functionMap is (status, data1, data2)
 *
 * Using closures to help with initialization
 *
 * The functions are not agnostic to how they are being input (ie from knobs or pads),
 * When a function is going to be triggered by the PADS in CC mode, you need to 
 * check data2 because a pad sends a message on press and release
 */

const DO_SHOW_POPUP = true;

function popup(message) {
    if (DO_SHOW_POPUP) {
        host.showPopupNotification(message);
    }
}


// Takes a SettableBooleanValue to toggle
function toggleFunction(name, value) {
    value.markInterested();
    return (status, data1, data2) => {
        this.name = name;
        if (data2 !== 0) {
            value.toggle();
            // for some reason get gets the value before the toggle
            popup(`${name} ${!value.get() ? "On" : "Off"}`);
        }
    }
}

// Takes a SettableEnumValue and cycles to the next one
// Uses the enum's definition to figure out how to cycle around
// if there's a less convoluted way to do that without hardcoding enum values
// someone please tell me
function enumCycleFunction(name, value) {
    value.markInterested();
    const enumDefinition = value.enumDefinition();
    const valueCount = enumDefinition.getValueCount();
    return (status, data1, data2) => {
        if (data2 !== 0) {
            const currentId = value.get();
            const valueDefinition = enumDefinition.valueDefinitionFor(currentId);
            const currentIndex = valueDefinition.getValueIndex();
            const nextIndex = (currentIndex + 1) % valueCount;
            const nextValue = enumDefinition.valueDefinitionAt(nextIndex);
            const nextId = nextValue.getId();
            value.set(nextId);
            popup(`${name}: ${nextValue.getDisplayName()}`);
        }
    }
}

TRANSPORT.PLAY = (bitwig) => {
    return (status, data1, data2) => {
        if (data2 !== 0) bitwig.transport.play(); popup("Play");
    }
}

TRANSPORT.STOP = (bitwig) => {
    return (status, data1, data2) => {
        if (data2 !== 0) bitwig.transport.stop(); popup("Stop");
    }
}

TRANSPORT.REC                   = (bitwig) => toggleFunction("Record", bitwig.transport.isArrangerRecordEnabled());
TRANSPORT.METRONOME             = (bitwig) => toggleFunction("Metronome", bitwig.transport.isMetronomeEnabled());
TRANSPORT.LOOP                  = (bitwig) => toggleFunction("Loop", bitwig.transport.isArrangerLoopEnabled());
TRANSPORT.OVERDUB               = (bitwig) => toggleFunction("Overdub", bitwig.transport.isArrangerOverdubEnabled());
TRANSPORT.AUTOMATION_WRITE      = (bitwig) => toggleFunction("Automation Write", bitwig.transport.isArrangerAutomationWriteEnabled());
TRANSPORT.PUNCH_IN              = (bitwig) => toggleFunction("Punch In", bitwig.transport.isPunchInEnabled());
TRANSPORT.PUNCH_OUT             = (bitwig) => toggleFunction("Punch Out", bitwig.transport.isPunchOutEnabled());
TRANSPORT.AUTOMATION_WRITE_MODE = (bitwig) => enumCycleFunction("Automation Write Mode", bitwig.transport.automationWriteMode());
TRANSPORT.PREROLL_MODE          = (bitwig) => enumCycleFunction("Pre Roll Length", bitwig.transport.preRoll());
TRANSPORT.PREROLL_METRONOME     = (bitwig) => toggleFunction("Pre Roll Metronome", bitwig.transport.isMetronomeAudibleDuringPreRoll());

TRANSPORT.TAP_TEMPO = (bitwig) => {
    const BITWIG_MAX_TEMPO = 666;
    bitwig.transport.tempo().modulatedValue().markInterested();
    return (status, data1, data2) => {
        if (data2 !== 0) {
            bitwig.transport.tapTempo()

            // this is always one tap behind, dont know how fix
            popup(`Tap Tempo: ${bitwig.transport.tempo().modulatedValue().getRaw().toFixed(2)}BPM`);
        }
    }
}

TRACK.NEXT = (bitwig) => {
    bitwig.track.name().addValueObserver((value) => { popup(value); });
    return (status, data1, data2) => {
        if (data2 !== 0) {
            bitwig.track.selectNext();        
        }
    }
}

TRACK.PREV = (bitwig) => {
    bitwig.track.name().addValueObserver((value) => { popup(value); });
    return (status, data1, data2) => {
        if (data2 !== 0) {
            bitwig.track.selectPrevious();        
        }
    }
}

// TODO IDK this thing is for some reason only modulating the bottom right control
REMOTE_CONTROLS.MODULATE_CONTROL = (param_id, bitwig) => {
    bitwig.remoteControls.getParameter(param_id).markInterested();
    bitwig.remoteControls.getParameter(param_id).setIndication(true);
    return (status, data1, data2) => {
        bitwig.remoteControls.getParameter(param_id).set(data2, 128);
    }
}

REMOTE_CONTROLS.SELECT_PAGE = (page_index, bitwig) => {
    bitwig.remoteControls.selectedPageIndex().markInterested();
    bitwig.remoteControls.pageNames().markInterested();
    bitwig.remoteControls.pageCount().markInterested();
    return (status, data1, data2) => {
        if (page_index > bitwig.remoteControls.pageCount()) {
            popup(`Page ${page_index} not available`);
        }
        else {
            bitwig.remoteControls.selectedPageIndex().set(page_index);

            const pageName = bitwig.remoteControls.pageNames().get()[page_index];

            popup(pageName);
        }
    }
}


UNMAPPED = () => { popup("Unmapped") }

