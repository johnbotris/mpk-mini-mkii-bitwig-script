loadAPI(11);

load("functionMap.js");

host.defineController("Akai", "MPKmini mkII", "2.0", "c790467a-ce30-42d9-8deb-8070a6039c4b");
host.defineMidiPorts(1, 1);

function init() {

    const NUM_PARAM_PAGES = 8;
    const NUM_USER_CONTROLS = 8;

    const application = host.createApplication();
    const transport = host.createTransport();
    const track = host.createCursorTrack(2, 0);
    const device = track.createCursorDevice("cursorDevice1", "Device Cursor", 2, CursorDeviceFollowMode.FOLLOW_SELECTION);
    const remoteControls = device.createCursorRemoteControlsPage(NUM_PARAM_PAGES);

    let functionMap = createFunctionMap(host, application, transport, track, device, remoteControls);

    host.getMidiInPort(0).setMidiCallback((status, data1, data2) => {
        const id = (status << 16) | (data1 << 8);
        if (functionMap[id]) {
            const fn = functionMap[id];
            fn(status, data1, data2);
        } 

        println(`(${(id | data2).toString(16)}) status: ${status}, data1: ${data1}, data2: ${data2}`)
    });

    // Capture note inputs and send them directly to bitwig
    for(let input of MAPPINGS.NOTE_INPUTS) {
        let noteInput = host.getMidiInPort(0).createNoteInput(input.name, input.masks);
        noteInput.setShouldConsumeEvents(true);
    } 
}
