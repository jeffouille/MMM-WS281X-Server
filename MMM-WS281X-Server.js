Module.register('MMM-WS281X-Server',{

    defaults: {
        hostname: 'localhost',
        port: 9999,
        ledOnStart: false,
        ledOnStartEffect: 'start',
        showAlert: false,
        showAlertEffect: 'alert',
        useMMMFaceRecoDNN: false,
        userLoginEffect: 'login',
        userLogoutEffect: 'logout',
        useMMMGoogleAssistant: false,
        assistantListenEffect: 'chaser',
        assistantErrorEffect: 'alert',
        assistantReplyEffect: 'chaser',
        useMMMSelfieshot: false,
        selfieshotLaunchedEffect: 'alert',
        channel: 1,
        led_count: 12,
        led_type: 0,
        invert: 0,
        global_brightness: 255,
        gpionum: 18,
        spi: false,
        spi_dev: '/dev/spidev0.0',
        spi_speed: 20,
        alt_spi_pin: 10,
        color_backup:'000000' // EDF backup of the color of the mirror
    },

    start: function() {
        Log.info('[' + this.name + '] Starting');
        this.sendSocketNotification('init', this.config);
    },

    notificationReceived: function(notification, payload) {
        if (notification === 'SHOW_ALERT') {
            // LED effect on alerts shown in the UI:
            if (this.config.showAlert) {
                this.sendSocketNotification('alert', this.config);
            }
        } else if (notification === 'USERS_LOGIN') {
            // LED effect support for MMMFaceRecoDNN Module:
            if (this.config.useMMMFaceRecoDNN) {
                this.sendSocketNotification('login', this.config);
            }
        } else if (notification === 'USERS_LOGOUT' || notification === 'USERS_LOGOUT_MODULES') {
            // LED effect support for MMMFaceRecoDNN Module:
            if (this.config.useMMMFaceRecoDNN) {
                this.sendSocketNotification('logout', this.config);
            }
        //Notification GoogleAssistant 
            /*
            ASSISTANT_STANDBY
            ASSISTANT_LISTEN
            ASSISTANT_THINK
            ASSISTANT_CONFIRMATION
            ASSISTANT_REPLY
            ASSISTANT_CONTINUE
            ASSISTANT_HOOK
            ASSISTANT_ERROR
            */
        } else if (notification === 'ASSISTANT_LISTEN') {
            // LED effect support for MMM-GoogleAssistant Module:
            if (this.config.useMMMGoogleAssistant) {
                this.sendSocketNotification('googleassistant-listen', this.config);
            }
        } else if (notification === 'ASSISTANT_ERROR') {
            // LED effect support for MMM-GoogleAssistant Module:
            if (this.config.useMMMGoogleAssistant) {
                this.sendSocketNotification('googleassistant-error', this.config);
            }
        } else if (notification === 'ASSISTANT_THINK' || notification === 'ASSISTANT_REPLY') {
            // LED effect support for MMMFaceRecoDNN Module:
            if (this.config.useMMMGoogleAssistant) {
                this.sendSocketNotification('googleassistant-reply', this.config);
            }
        } else if (notification === 'SELFIE_LAUNCHED') {
            // LED effect support for MMM-SELFISHOT Module:
            if (this.config.useMMMSelfieshot) {
                this.sendSocketNotification('selfie-launched', this.config);
            }
        } else if (notification === 'WS281X_ASSISTANT_COLOR') {
           //Log.info('[' + this.name + '] WS281X_ASSISTANT_COLOR NOTIF RECEIVED');
            // LED color command by Google Assistant
            if (this.config.useMMMGoogleAssistant) {
             //  Log.info('[' + this.name + '] WS281X_ASSISTANT_COLOR NOTIF sendSocketNotification');
             //   Log.info('[' + this.name + '] WS281X_ASSISTANT_COLOR NOTIF payload.color:'+payload.color);
             //   Log.info('[' + this.name + '] WS281X_ASSISTANT_COLOR NOTIF payload.message:'+payload.message);
                this.sendSocketNotification('googleassistant-color', payload);
            }
        } else if (notification === 'WS281X_ASSISTANT_OFF') {
            // LED OFF command by Google Assistant
            if (this.config.useMMMGoogleAssistant) {
                this.sendSocketNotification('googleassistant-led_off');
            }
        }



    }
});
