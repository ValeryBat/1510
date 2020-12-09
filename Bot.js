// ==UserScript==
// @name         Bot Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  !
// @author       I
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getCookie(name) {
	let matches = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
	'xn----7sbab5aqcbiddtdj1e1g.xn--p1ai': ['Гобой','Флейта','Как звучит флейта','Балалайка','Фагот','Скрипка','Саксофон'],
	"crushdrummers.ru": [ "Барабанное шоу", "Заказать барабанное шоу в Москве","барабанщики на корпоратив" ]
};
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0, words.length)];
let yandexInput = document.getElementById('text');
let button = document.getElementsByClassName('button_theme_websearch')[0];
let links = document.links;


	if (button != undefined) {
		let i = 0;
		document.cookie = "site=" + site;
		let timerId = setInterval(() => {
			let yandexInputs = document.getElementsByClassName('input__control mini-suggest__input')[0];
			yandexInputs.value += word[i++];
			if (i == word.length) {
				clearInterval(timerId);
				button.click();
			}
		}, 1000);

} else if (location.hostname == 'yandex.ru') {
	let flag = true;
	let pageNum = document.getElementsByClassName(
		"link link_theme_none link_target_serp pager__item pager__item_kind_page i-bem"
	)[0].textContent;
	site = getCookie("site");
	let links = document.getElementsByClassName("link link_theme_normal organic__url");

	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		if (link.href.indexOf(site) != -1) {
			flag = false;
			link.removeAttribute('target');
			setTimeout(() => link.href.click(), 3000);
            break;
		} 
	}
   let nextPage = document.querySelector(`a[aria-label="Следующая страница"]`);
			nextPage.click();
	if (pageNum == '10') location.href = 'https://yandex.ru'; //
	if (flag) setTimeout(() => link.click(), 3000);
} else {
	if (getRandom(1, 11) >8)    location.href = 'https://yandex.ru';
	else
		setInterval(() => {
			let link = links[getRandom(0, links.length)];
			if (link.href.indexOf(location.hostname) != -1) link.click();
		}, 5000);
}
