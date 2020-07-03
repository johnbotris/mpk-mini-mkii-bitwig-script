load("midiMap.js");
load("functions.js");

/*
 * Get a map from int -> function
 *
 * Where the functions take three params: 
 * p2: MIDI status byte
 * p3: MIDI data byte 1
 * p4: MIDI data byte 2
 */

function createFunctionMap(host, application, transport, track, device, remoteControls) {


    const SCROLL_AMT = 20;
    const SCROLL_SNAP = true;

    const functionMap = new Map();

    const bitwig = {
        host: host,
        application: application,
        transport: transport,
        track: track,
        device: device,
        remoteControls: remoteControls,
    };

    /* * * PROGRAM 1 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

    /* Pad CC Bank A * * * * * * * 1 * */
    functionMap[MAPPINGS.PROG1.PAD_CC_1]  = TRANSPORT.PLAY(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_2]  = TRANSPORT.STOP(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_3]  = TRANSPORT.SCROLL(-SCROLL_AMT, SCROLL_SNAP, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_4]  = TRANSPORT.SCROLL(SCROLL_AMT, SCROLL_SNAP, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_5]  = TRANSPORT.REC(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_6]  = TRANSPORT.LOOP(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_7]  = TRANSPORT.OVERDUB(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_8]  = TRANSPORT.METRONOME(bitwig);

    /* Pad CC Bank B * * * * * * * 1 * */
    functionMap[MAPPINGS.PROG1.PAD_CC_9]  = TRACK.PREV(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_10] = TRACK.NEXT(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_11] = TRANSPORT.AUTOMATION_WRITE_MODE(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_12] = TRANSPORT.PREROLL_MODE(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_13] = TRANSPORT.PUNCH_IN(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_14] = TRANSPORT.PUNCH_OUT(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_15] = TRANSPORT.AUTOMATION_WRITE(bitwig);
    functionMap[MAPPINGS.PROG1.PAD_CC_16] = TRANSPORT.TAP_TEMPO(bitwig);

    /* Pad PC Bank A * * * * * * * 1 * */
    functionMap[MAPPINGS.PROG1.PAD_PC_1]  = REMOTE_CONTROLS.SELECT_PAGE(0, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_2]  = REMOTE_CONTROLS.SELECT_PAGE(1, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_3]  = REMOTE_CONTROLS.SELECT_PAGE(2, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_4]  = REMOTE_CONTROLS.SELECT_PAGE(3, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_5]  = REMOTE_CONTROLS.SELECT_PAGE(4, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_6]  = REMOTE_CONTROLS.SELECT_PAGE(5, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_7]  = REMOTE_CONTROLS.SELECT_PAGE(6, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_8]  = REMOTE_CONTROLS.SELECT_PAGE(7, bitwig);

    /* Pad PC Bank B * * * * * * * 1 * */
    functionMap[MAPPINGS.PROG1.PAD_PC_9]  = REMOTE_CONTROLS.SELECT_PAGE(8, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_10] = REMOTE_CONTROLS.SELECT_PAGE(9, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_11] = REMOTE_CONTROLS.SELECT_PAGE(10, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_12] = REMOTE_CONTROLS.SELECT_PAGE(11, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_13] = REMOTE_CONTROLS.SELECT_PAGE(12, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_14] = REMOTE_CONTROLS.SELECT_PAGE(13, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_15] = REMOTE_CONTROLS.SELECT_PAGE(14, bitwig);
    functionMap[MAPPINGS.PROG1.PAD_PC_16] = REMOTE_CONTROLS.SELECT_PAGE(15, bitwig);

    /* Knobs * * * * * * * * * * * 1 * */
    functionMap[MAPPINGS.PROG1.KNOB_1]    = REMOTE_CONTROLS.MODULATE_CONTROL(0, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_2]    = REMOTE_CONTROLS.MODULATE_CONTROL(1, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_3]    = REMOTE_CONTROLS.MODULATE_CONTROL(2, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_4]    = REMOTE_CONTROLS.MODULATE_CONTROL(3, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_5]    = REMOTE_CONTROLS.MODULATE_CONTROL(4, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_6]    = REMOTE_CONTROLS.MODULATE_CONTROL(5, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_7]    = REMOTE_CONTROLS.MODULATE_CONTROL(6, bitwig);
    functionMap[MAPPINGS.PROG1.KNOB_8]    = REMOTE_CONTROLS.MODULATE_CONTROL(7, bitwig);

    /* Joystick  * * * * * * * * * 1 * */
    functionMap[MAPPINGS.PROG1.JOYSTICK_X] = UNMAPPED; // This is free to be mapped from within Bitwig
    // functionMap[MAPPINGS.PROG1.JOYSTICK_Y] = UNMAPPED; // This is mapped directly to pitch bend in the MPK and will not be received by the script

    /* * * PROGRAM 2 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

    /* Pad CC Bank A * * * * * * * 2 * */
    functionMap[MAPPINGS.PROG2.PAD_CC_1]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_2]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_3]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_4]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_5]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_6]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_7]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_8]  = UNMAPPED;

    /* Pad CC Bank B * * * * * * * 2 * */
    functionMap[MAPPINGS.PROG2.PAD_CC_9]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_10] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_11] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_12] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_13] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_14] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_15] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_CC_16] = UNMAPPED;

    /* Pad PC Bank A * * * * * * * 2 * */
    functionMap[MAPPINGS.PROG2.PAD_PC_1]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_2]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_3]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_4]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_5]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_6]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_7]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_8]  = UNMAPPED;

    /* Pad PC Bank B * * * * * * * 2 * */
    functionMap[MAPPINGS.PROG2.PAD_PC_9]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_10] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_11] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_12] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_13] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_14] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_15] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.PAD_PC_16] = UNMAPPED;

    /* Knobs * * * * * * * * * * * 2 * */
    functionMap[MAPPINGS.PROG2.KNOB_1]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_2]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_3]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_4]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_5]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_6]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_7]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.KNOB_8]    = UNMAPPED;

    /* Joystick  * * * * * * * * * 2 * */
    functionMap[MAPPINGS.PROG2.JOYSTICK_LEFT]  = UNMAPPED;
    functionMap[MAPPINGS.PROG2.JOYSTICK_RIGHT] = UNMAPPED;
    functionMap[MAPPINGS.PROG2.JOYSTICK_UP]    = UNMAPPED;
    functionMap[MAPPINGS.PROG2.JOYSTICK_DOWN]  = UNMAPPED;

    /* * * PROGRAM 3 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

    /* Pad CC Bank A * * * * * * * 3 * */
    functionMap[MAPPINGS.PROG3.PAD_CC_1]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_2]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_3]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_4]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_5]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_6]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_7]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_8]  = UNMAPPED;

    /* Pad CC Bank B * * * * * * * 3 * */
    functionMap[MAPPINGS.PROG3.PAD_CC_9]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_10] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_11] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_12] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_13] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_14] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_15] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_CC_16] = UNMAPPED;

    /* Pad PC Bank A * * * * * * * 3 * */
    functionMap[MAPPINGS.PROG3.PAD_PC_1]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_2]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_3]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_4]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_5]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_6]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_7]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_8]  = UNMAPPED;

    /* Pad PC Bank B * * * * * * * 3 * */
    functionMap[MAPPINGS.PROG3.PAD_PC_9]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_10] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_11] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_12] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_13] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_14] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_15] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.PAD_PC_16] = UNMAPPED;

    /* Knobs * * * * * * * * * * * 3 * */
    functionMap[MAPPINGS.PROG3.KNOB_1]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_2]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_3]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_4]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_5]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_6]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_7]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.KNOB_8]    = UNMAPPED;

    /* Joystick  * * * * * * * * * 3 * */
    functionMap[MAPPINGS.PROG3.JOYSTICK_LEFT]  = UNMAPPED;
    functionMap[MAPPINGS.PROG3.JOYSTICK_RIGHT] = UNMAPPED;
    functionMap[MAPPINGS.PROG3.JOYSTICK_UP]    = UNMAPPED;
    functionMap[MAPPINGS.PROG3.JOYSTICK_DOWN]  = UNMAPPED;


    /* * * PROGRAM 4 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

    /* Pad CC Bank A * * * * * * * 4 * */
    functionMap[MAPPINGS.PROG4.PAD_CC_1]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_2]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_3]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_4]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_5]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_6]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_7]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_8]  = UNMAPPED;

    /* Pad CC Bank B * * * * * * * 4 * */
    functionMap[MAPPINGS.PROG4.PAD_CC_9]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_10] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_11] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_12] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_13] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_14] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_15] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_CC_16] = UNMAPPED;

    /* Pad PC Bank A * * * * * * * 4 * */
    functionMap[MAPPINGS.PROG4.PAD_PC_1]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_2]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_3]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_4]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_5]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_6]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_7]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_8]  = UNMAPPED;

    /* Pad PC Bank B * * * * * * * 4 * */
    functionMap[MAPPINGS.PROG4.PAD_PC_9]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_10] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_11] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_12] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_13] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_14] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_15] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.PAD_PC_16] = UNMAPPED;

    /* Knobs * * * * * * * * * * * 4 * */
    functionMap[MAPPINGS.PROG4.KNOB_1]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_2]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_3]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_4]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_5]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_6]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_7]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.KNOB_8]    = UNMAPPED;

    /* Joystick  * * * * * * * * * 4 * */
    functionMap[MAPPINGS.PROG4.JOYSTICK_LEFT]  = UNMAPPED;
    functionMap[MAPPINGS.PROG4.JOYSTICK_RIGHT] = UNMAPPED;
    functionMap[MAPPINGS.PROG4.JOYSTICK_UP]    = UNMAPPED;
    functionMap[MAPPINGS.PROG4.JOYSTICK_DOWN]  = UNMAPPED;

    return functionMap;
}
