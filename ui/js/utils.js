window.introChiao = '我是黃國僑，台北人，是這場婚禮的新郎<br>' + 
	'她不是我姐不是我妹，更不是我媽<br>' +
	'（不要懷疑，這一定是我聽過最失禮認錯人）<br>' +
	'喜歡運動，喜歡的程度大概是體脂15%<br>' +
	'喜歡寫程式，所以有了這個網站<br>' +
	'喜歡黃琇琳，於是我們要結婚了<br>' +
	'喜歡簡單的生活，興趣就這些些而已<br>' +
	'我是黃國僑，歡迎大家來參加我們的婚禮'
;
window.introLin = '我是黃琇琳，高雄人，是這場婚禮的新娘<br>' + 
	'請千萬不要把他誤認為我爸<br>'+
	'(即使你知道為什麼會誤認，也不要講出來)<br>' +
	'喜歡運動，雖然最近膝蓋不好，慢慢復元中<br>' +
	'喜歡寫程式，工作寫程式，人生也將交給程式人 <br>' +
	'喜歡黃國僑，於是要跟他牽手過一輩子了<br>' +
	'喜歡對社會有所貢獻，但還在尋找偉大航道<br>' +
	'我是黃琇琳，歡迎大家來參加我們的婚禮'
;
window.howmuchNoteYes = '可以來參加，就都要流淚了，怎麼可能還問這麼失禮的問題。'
;
window.howmuchNoteNo = '太可惜了！都已經不能來了，怎麼可能還問你要包多少？'
;
window.loginAppFailed = '怎麼辦？不能報名噎～發issue給我們之前，再按一下我們精美的按鈕FB如何？'
;
window.loginFBFailed = '怎麼辦？不能報名噎～發issue給我們之前，再按一下我們精美的按鈕FB如何？'
;
window.loginTitle = '拜·託·登·入'
;
window.loginTitleSuccess = '囍筵'
;
window.steakText = '{0}位大人(葷)'
;
window.veganText = '{0}位大人(素)'
;
window.childrenText = '{0}位屁孩(兒童椅)'
;
window.howmuchPlaceHolderYes = '太少強制不參加'
;
window.howmuchPlaceHolderNo = '就不逼你惹'
;
window.emailPlaceHolderYes = '不要喜帖請留白，就當你記住惹'
;
window.emailPlaceHolderNo = '不參加要不要拿個電子喜帖意思意思'
;
window.submitFailed = '悲劇耶～看到這個應該真的有bug，別慌張，你可以印出來寄封信給我們來報名。'
;
window.galleryTitle = '假掰照集錦'
;
window.successMsg = '登記成功啦！我們12月19號中午12:00世貿三三不見不散。'
;
window.thanksMsg = '好可惜呦！你的祝福我們收到了，關閉分頁之前請你聽首歌吧！' +
	'<a href="https://www.youtube.com/watch?v=Ew4VvF0DPMc" target="_blank">以後別做朋友</a>' +
	'(開玩笑的啦！)'
;
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}