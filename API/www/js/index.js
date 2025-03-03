document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

document.addEventListener('DOMContentLoaded', function() {

    const elemsSidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elemsSidenav);

    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);

    const tabsElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabsElems[0], { swipeable: true });
    

    document.getElementById('link').addEventListener('click', function() {
        M.Tabs.getInstance(document.querySelector('.tabs')).select('test-swipe-1');
    });

    document.getElementById('link2').addEventListener('click', function() {
        M.Tabs.getInstance(document.querySelector('.tabs')).select('test-swipe-2');
    });

    document.getElementById('link3').addEventListener('click', function() {
        M.Tabs.getInstance(document.querySelector('.tabs')).select('test-swipe-3');
    });

    document.getElementById('passar').addEventListener('click', function() {
      M.Tabs.getInstance(document.querySelector('.tabs')).select('test-swipe-2');
  });
});
