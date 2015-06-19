var wasLastShown = '';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { //onUpdated should fire when the selected tab is changed or a link is clicked
    chrome.tabs.getSelected(null, function (tab) {

        var pat = /www.facebook.com|9gag.com|www.walla.co.il|www.ynet.co.il/g;

        if (pat.test(tab.url)) {
            show();
        }
    });
});

function show() {
    var tNow = new Date().getTime();
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.

    if ((tNow - (2 * 60 * 1000)) > wasLastShown) {
        new Notification(hour + time[2] + ' ' + period, {
            icon: '../icons/icon48.png',
            body: 'Time to make something useful!'
        });


        wasLastShown = tNow;
    }
}