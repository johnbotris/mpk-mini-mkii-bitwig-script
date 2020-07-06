loadAPI(11);

load("functionMap.js");

host.defineController("Akai", "MPKmini mkII", "0.1", "20dee110-bbd5-11ea-b3de-0242ac130004");
host.defineMidiPorts(1, 1);

function init() {

    const NUM_REMOTE_CONTROL_PARAMS = 8; // 8 per page?

    const application = host.createApplication();
    const transport = host.createTransport();
    const track = host.createCursorTrack(2, 0);
    const device = track.createCursorDevice("cursorDevice1", "Device Cursor", 2, CursorDeviceFollowMode.FOLLOW_SELECTION);
    const remoteControls = device.createCursorRemoteControlsPage(NUM_REMOTE_CONTROL_PARAMS);

    let functionMap = createFunctionMap(host, application, transport, track, device, remoteControls);

    host.getMidiInPort(0).setMidiCallback((status, data1, data2) => {
        const id = (status << 16) | (data1 << 8);
        if (functionMap[id]) {
            const fn = functionMap[id];
            fn(status, data1, data2);
        } 

        // println(`(${(id | data2).toString(16)}) status: ${status}, data1: ${data1}, data2: ${data2}`)
    });

    host.getMidiInPort(0)
        .createNoteInput(MAPPINGS.NOTE_INPUT.name, MAPPINGS.NOTE_INPUT.masks)
        .setShouldConsumeEvents(true);
}

