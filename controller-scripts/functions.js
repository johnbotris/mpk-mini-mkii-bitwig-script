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


/*
 * Using addValueObserver to show popups from the pad functions is more or less necessary in order keep the popups in sync with the actual state of bitwig
 * it's annoying that it also causes popups to show when interacting directly with bitwig and also at the initialization of the script. 
 * I can't see a way around this right now but the popups can be turned off by making the folloing constant false
 */
const DO_SHOW_POPUP = true;

function popup(message) {
    if (DO_SHOW_POPUP) {
        host.showPopupNotification(message);
    }
}


// Takes a SettableBooleanValue to toggle
function toggleFunction(name, value) {
    const onChange = (newValue) => { popup(`${name} ${newValue ? "On" : "Off"}`); };
    value.addValueObserver(onChange);
    return (status, data1, data2) => {
        if (data2 !== 0) {
            value.toggle();
        }
    }
}

// Takes a SettableEnumValue and cycles to the next one
// Uses the enum's definition to figure out how to cycle around
function enumCycleFunction(name, value) {

    const enumDefinition = value.enumDefinition();
    const valueCount = enumDefinition.getValueCount();

    const onChange = (newValue) => { popup(`${name}: ${enumDefinition.valueDefinitionFor(newValue).getDisplayName()}`); };
    value.addValueObserver(onChange);

    return (status, data1, data2) => {
        if (data2 !== 0) {
            // if there's a less convoluted way to do that without hardcoding enum values
            const currentId = value.get();
            const valueDefinition = enumDefinition.valueDefinitionFor(currentId);
            const currentIndex = valueDefinition.getValueIndex();
            const nextIndex = (currentIndex + 1) % valueCount;
            const nextValue = enumDefinition.valueDefinitionAt(nextIndex);
            const nextId = nextValue.getId();
            value.set(nextId);
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
    bitwig.transport.tempo().modulatedValue().addValueObserver(
        (tempo) => {
            // not sure right now how to add value observer to tempo().modulatedValue().getRaw()
            // will figure out when less sleepy
            popup(`${bitwig.transport.tempo().modulatedValue().getRaw().toFixed(2)}BPM`);
        }
    );
    return (status, data1, data2) => {
        if (data2 !== 0) {
            bitwig.transport.tapTempo()
        }
    }
}

TRANSPORT.SCROLL = (amount, doSnap, bitwig) => {
    return (status, data1, data2) => {
        if (data2 !== 0) {
            bitwig.transport.incPosition(amount, doSnap);
        }
    }
};

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

REMOTE_CONTROLS.MODULATE_CONTROL = (param_id, bitwig) => {
    bitwig.remoteControls.getParameter(param_id).markInterested();
    bitwig.remoteControls.getParameter(param_id).setIndication(true);
    return (status, data1, data2) => {
        bitwig.remoteControls.getParameter(param_id).set(data2, 128);
    }
}

REMOTE_CONTROLS.SELECT_PAGE = (page_index, bitwig) => {

    bitwig.remoteControls.pageNames().markInterested();
    bitwig.remoteControls.pageCount().markInterested();

    bitwig.remoteControls.selectedPageIndex().addValueObserver(
        (newIndex) => { popup(bitwig.remoteControls.pageNames().get()[newIndex]); }
    );

    return (status, data1, data2) => {
        if (page_index > bitwig.remoteControls.pageCount()) {
            popup(`Page ${page_index} not available`);
        }
        else {
            bitwig.remoteControls.selectedPageIndex().set(page_index);

        }
    }
}


UNMAPPED = () => { popup("Unmapped") }

