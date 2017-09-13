document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function loadTasks() {
    $('#w1').val(getCookie("w1"));
    $('#w31').val(getCookie("w31"));
    $('#w32').val(getCookie("w32"));
    $('#w33').val(getCookie("w33"));
    $('#w51').val(getCookie("w51"));
    $('#w52').val(getCookie("w52"));
    $('#w53').val(getCookie("w53"));
    $('#w54').val(getCookie("w54"));
    $('#w55').val(getCookie("w55"));
    markchecks();
}

function getCookie(cname) {
    var results = document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');
    if (results) {
        return (unescape(results[2]));
    } else {
        return null;
    }
}

function logOut() {
    if (confirm("”верены?")) {
        document.cookie = "log=; path=/; expires=-1";
        var warr = ["w1", "w31", "w32", "w33", "w51", "w52", "w53", "w54", "w55"];
        var chname = "";
        var wname = "";
        var i = 0;
        while (i < 9) {
            wname = warr[i];
            chname = wname + "c";
            document.cookie = wname + "=; path=/; expires=-1";
            document.cookie = chname + "=; path=/; expires=-1";
            $("#" + wname).val(getCookie(wname));
            $("#" + chname).attr('checked', false);
            i++;
        }
    }
}

function markchecks() {
    var chechsarr = ["w1", "w31", "w32", "w33", "w51", "w52", "w53", "w54", "w55"];
    var vcheckid = "";
    var wtid = "";
    var i = 0;
    while (i < 9) {
        vcheckid = chechsarr[i] + "c";
        wtid = chechsarr[i];
        if (getCookie(vcheckid) == "true") {
            $("#" + vcheckid).attr('checked', true);
            markthis(vcheckid, wtid);
        }
        i++;
    }
}

function savethis(el) {
    var kc = event.keyCode;
    if (kc == 67 || kc == 86 || kc == 65 || kc == 32 || kc == 9 || kc == 13 || kc == 16 || kc == 17 || kc == 18 || kc == 19 || kc == 20 || kc == 27 || kc == 33 || kc == 34 || kc == 35 || kc == 36 || kc == 37 || kc == 38 || kc == 39 || kc == 40 || kc == 45 || kc == 46) {

    } else {
        var wid = el.id;
        var wtext = $(el).val();
        updateCookie(wid, wtext);
    }
}

function markthis(el, wtid) {
    var cid = el;
    var cstatus = $("#" + cid).is(':checked');
    var thisimgid = $("#" + cid).nextAll("img").attr("id");
    var textWidth = $("#" + cid).nextAll("input").val().length;
    var textY = $("#" + cid).nextAll("input").position().top;
    if (wtid == "w1") {
        textY = textY + 18 + "px";
        textWidth = textWidth * 13.5 + "px";
    } else if (wtid == "w31" || wtid == "w32" || wtid == "w33") {
        textY = textY + 15 + "px";
        textWidth = textWidth * 10 + "px";
    } else {
        textY = textY + 12 + "px";
        textWidth = textWidth * 7 + "px";
    }
    if (cstatus) {
        updateCookie(cid, cstatus);
        $("#" + wtid).attr("unselectable", "on");
        $("#" + wtid).attr("readonly", "on");
        $("#" + wtid).css({"text-decoration": "line-through"});
        $("#" + wtid).css({"-webkit-user-select": "none"});
        $("#" + wtid).css({"-moz-user-select": "none"});
        $("#" + wtid).css({"-ms-user-select": "none"});
        $("#" + wtid).css({"-o-user-select": "none"});
        $("#" + thisimgid).css({"top": textY});
        $("#" + thisimgid).css({"display": "inline"});
        $("#" + thisimgid).css({"width": textWidth});
    } else {
        updateCookie(cid, cstatus);
        $("#" + wtid).removeAttr("unselectable");
        $("#" + wtid).removeAttr("readonly");
        $("#" + wtid).css({"text-decoration": "none"});
        $("#" + wtid).css({"-webkit-user-select": "auto"});
        $("#" + wtid).css({"-moz-user-select": "auto"});
        $("#" + wtid).css({"-ms-user-select": "auto"});
        $("#" + wtid).css({"-o-user-select": "auto"});
        $("#" + thisimgid).css({"display": "none"});
    }
}

function updateCookie(name, cval) {
    document.cookie = name + "=; path=/; expires=-1";
    var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 72);
    document.cookie = name + "=" + cval + "; path=/; expires=" + date.toUTCString();
}

function showc() {
    alert(document.cookie);
}

function showFaq() {
    $(".faq").css({"display": "block"});
    $(".menu").css({"display": "none"});
}

function hideFaq() {
    $(".faq").css({"display": "none"});
    $(".menu").css({"display": "block"});
    markchecks();
}