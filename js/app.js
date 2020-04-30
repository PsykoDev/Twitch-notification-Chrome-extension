var data = json.parse(data)

try {         
    JSON.parse('viewer_count');          
    JSON.parse('"game_id"');        
    JSON.parse('title'); 

} catch (e) {
    console.error("Parsing error:", e);
}

function loadCache() {
    $("#stream-name").html(Biche_params.name);

    if (localStorage.stream_preview != null) {
        $("#stream-preview").attr("src", localStorage.stream_preview);
    }

    if (localStorage.stream_logo != null) {
        $("#stream-logo").attr("src", localStorage.stream_logo);
    }

    $(".stream-link").attr("href", "https://www.twitch.tv/" + Biche_params.name);
}

$(window).ready(function (data) {
    $("#stream-viewers").html(data.data[0].viewer_count);
    $("#stream-game").html("-");
    $("#stream-title").html("...");
    $("#stream-status").html("Offline");
    $("#stream-status-point").removeClass("on");

    chrome.browserAction.setBadgeText({ text: "" });

    if (localStorage.stream_logo != null) {
        $("#stream-logo").attr("src", localStorage.stream_logo);
    }
});

function onlineStream($data) {
    $("#stream-viewers").html($data.stream.viewers);
    $("#stream-game").html($data.stream.channel.game);
    $("#stream-title").html($data.stream.channel.status);
    $("#stream-logo").attr("src", $data.stream.channel.logo);
    $("#stream-preview").attr("src", $data.stream.preview.large);
    $(".stream-link").attr('href', $data.stream.channel.url);
    $("#stream-status").html("Online");
    $("#stream-status-point").addClass("on");

    localStorage.stream_preview = $data.stream.preview.large;
    localStorage.stream_logo = $data.stream.channel.logo;
}

function checkStream() {
    $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        url: "https://api.twitch.tv/kraken/streams/" + Biche_params.name + "?client_id=" + Biche_params.clientID,
        success: function (data) {
            if (data.stream != null) {
                onlineStream(data);
            } else {
                offlineStream();
            }
        }
    });

}

loadCache();
checkStream();
setInterval(checkStream, 120000);
