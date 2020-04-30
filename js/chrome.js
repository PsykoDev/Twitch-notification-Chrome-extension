var Biche_nav = {
    doNotification: function() {
        chrome.notifications.clear('notifyON' + Biche_params.title, function(id) { });
        chrome.notifications.create('notifyON' + Biche_params.title, { type: "basic", title: Biche_params.title, message: Biche_params.message, iconUrl: "img/iconon128.png" }, function(id) { });
    },
    setIconON: function(on) {
        var status = on ? "on" : "off";
        chrome.browserAction.setIcon({path : "img/icon" + status + "48.png"});
    },
    goIt: function() {
        if (Biche.isON){
            chrome.tabs.create({ url: Biche.getCurrentRedirectUrl()},function(tab){});
        } else {
            chrome.tabs.create({ url:Biche_params.offlineUrl},function(tab){});
        }
    }
}

//chrome.browserAction.onClicked.addListener(Biche_nav.goIt);
chrome.notifications.onClicked.addListener(function(notificationId){
    if (notificationId === 'notifyON' + Biche_params.title) {
        chrome.tabs.create({ url: Biche.getCurrentRedirectUrl()},function(tab){});
    }
});

Biche_nav.setIconON(false);
var Biche = new BtnLive(Biche_params.chaines, function(result) {
    Biche_nav.setIconON(result);
    if (result) {
        Biche_nav.doNotification();
    }
}, 60000, 2);
