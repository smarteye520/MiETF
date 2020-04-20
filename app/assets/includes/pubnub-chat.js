// ----------------------------------
// INCLUDE PUBNUB
// ----------------------------------
Ti.include('./pubnub.js');

// ----------------------------------
// INIT PUBNUB
// ----------------------------------
var pubnub = Ti.PubNub.init({
    publish_key   : 'demo',
    subscribe_key : 'demo',
    ssl           : false,
    origin        : 'pubsub.pubnub.com'
});

// ----------------------------------
// RANDOM COLOR
// ----------------------------------
function rnd_hex(light) { return Math.ceil(Math.random()*9); };
function rnd_color() {
    return '#'+Ti.PubNub.map(
        Array(3).join().split(','), rnd_hex
    ).join('');
}

Ti.App.Chat = function(setup) {
    // ----------------------------------
    // LISTEN FOR MESSAGES
    // ----------------------------------
    pubnub.subscribe({
        channel  : setup['chat-room'],
        connect  : function() {
            append_chat_message("Entered Chat Room...");
        },
        callback : function(message) {
            append_chat_message( message.text, message.color );
        },
        error : function() {
            append_chat_message( "Lost Connection...", "#f00" );
        }
    });

    // ----------------------------------
    // SEND MESSAGE
    // ----------------------------------
    function send_a_message(message) {
        if (!message) return;

        pubnub.publish({
            channel  : setup['chat-room'],
            message  : { text : message, color : this.my_color },
            callback : function(info) {
                if (!info[0]) setTimeout(function() {
                    send_a_message(message);
                }, 2000 );
            }
        });
    }

    // ----------------------------------
    // CREATE BASE UI TAB AND ROOT WINDOW
    // ----------------------------------
    var chat_window = Ti.UI.createView(setup['window']);
    var textfield   = Ti.UI.createTextField({
        width       : 247,
        height      : 32,
        left        : 6,
        bottom         : 4,
        color       : "#111",
        value       : "",
        border      : 1,
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        font        : {
            fontSize   : 14,
            fontWeight : 'bold'
        }
    });

    // Text Chat History
    var table = Ti.UI.createTableView({
    	separatorColor : 'transparent',
        top            : 4,
        height         : 420,
        backgroundColor: '#dddee0'
    });

    // Send Button
    var button = Ti.UI.createButton({
        title         : 'Send',
        bottom           : 4,
        right         : 4,
        width         : 60,
        height        : 30,
        borderRadius  : 6,
        shadowColor   : "#001",
        shadowOffset  : { x : 1, y : 1 },
        style         : Ti.UI.iOS.SystemButtonStyle.PLAIN,
        font          : {
            fontSize   : 16,
            fontWeight : 'bold'
        },
        backgroundGradient : {
            type          : 'linear',
            colors        : [ '#058cf5', '#015fe6' ],
            startPoint    : { x : 0, y : 0 },
            endPoint      : { x : 2, y : 50 },
            backFillStart : false
        }
    });

    // Append First Row (Blank)
   /* table.appendRow(Ti.UI.createTableViewRow({
        className : "pubnub_chat"
    }));
    */

    // Append New Chat Message
    function append_chat_message( message, color ) {
        var row = Ti.UI.createTableViewRow({
            className          : "pubnub_chat",
            height: 64 /*,
            backgroundGradient : {
                type          : 'linear',
                colors        : [ "#fff", '#eeeeed' ],
                startPoint    : { x : 0, y : 0 },
                endPoint      : { x : 0, y : 70 },
                backFillStart : false
            } */
        });
       // alert(color);

        var label = Ti.UI.createLabel({
            text   : message || "no-message",
            height : 'auto',
            width  : 'auto',
            color  : color || "#111",
            left   : 10,
            font   : { fontFamily: 'AvenirNextCondensed-Bold', fontStyle: 'bold', fontSize : '13sp'}
        });

        row.add(label);
        table.appendRow(row );
       // table.insertRowBefore( 0, row );
    }

    // Listen for Send Button Touch
    button.addEventListener( 'touchstart', function(e) {
        send_a_message(textfield.value);
        textfield.value = "";
        textfield.focus();
    });

    // Listen for Return Key Press
    textfield.addEventListener( 'return', function(e) {
        send_a_message(textfield.value);
        textfield.value = "";
        textfield.focus();
    });

    // Listen for Return Key Press
    chat_window.addEventListener( 'open', function(e) {
        textfield.focus();
    });

    chat_window.add(table);
    chat_window.add(button);
    chat_window.add(textfield);

    this.chat_window = chat_window;
    this.my_color    = rnd_color();

    append_chat_message("Connecting...");

    return this;
};

