"use strict"
// Меню бургер + меню закрывается при нажатии на любое место, кроме выбора языка
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu != null) {
	document.addEventListener('click', function (e) {
		if (e.target.closest('.icon-menu')) {
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			bodyLock();
		}
		if (!e.target.closest('.icon-menu') && !e.target.closest('.header__languages') && !e.target.closest('._popup-link') && !e.target.closest('.popup__content')) {
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
			bodyUnLock();
		}
	});
};
//спойлеры
const iconQuestions = document.querySelectorAll('.question__title');
const iconsQuestions = document.querySelectorAll('.question__icon');
if (iconQuestions.length > 0) {
	spollers(iconQuestions);
};
function spollers(iconQuestions) {
	iconQuestions.forEach(iconQuestion => {
		iconQuestionBody(iconQuestion);
		iconQuestion.addEventListener('click', setSpollersAction)
	});
}
function iconQuestionBody(iconQuestion) {
	if (!iconQuestion.classList.contains('_active')) {
		iconQuestion.nextElementSibling.hidden = true;
	}
}
function setSpollersAction(e) {
	const el = e.target;
	const spollerBlock = el.closest('.question');
	if (!spollerBlock.querySelectorAll('._slide').length) {
		if (el.classList.contains('icon-question')) {
			el.classList.toggle('_active');
			el.parentNode.classList.toggle('_active');
			spollerBlock.classList.toggle('_active');
			_slideToggle(el.parentNode.nextElementSibling, 500);
		} else {
			el.classList.toggle('_active');
			spollerBlock.classList.toggle('_active');
			if (el.firstElementChild != null) {
				el.firstElementChild.classList.toggle('_active');
			}
			_slideToggle(el.nextElementSibling, 500);
		}
	}
	//e.preventDefault();
}
function hideSpollerBody(spollerBlock) {
	const spollerActiveTitle = spollerBlock.querySelector('.question__title._active');
	if (spollerActiveTitle) {
		spollerActiveTitle.classList.remove('_active');
		_slideUp(spollerActiveTitle.nextElementSibling, 500);
	}
}
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//Добавляет класс эктив к выбранному языку во всех блоках с выбором языка, убирает класс у другого языка
const russ = document.querySelectorAll('.ru');
const engl = document.querySelectorAll('.en');
if (russ.length > 0) {
	for (let j = 0; j < russ.length; j++) {
		russ[j].classList.add('_active');
	}
	if (russ.length == engl.length) {
		for (let i = 0; i < russ.length; i++) {
			russ[i].addEventListener('click', function (e) {
				for (let j = 0; j < russ.length; j++) {
					russ[j].classList.add('_active');
					engl[j].classList.remove('_active');
				}
				e.preventDefault();
			})
			engl[i].addEventListener('click', function (e) {
				for (let j = 0; j < engl.length; j++) {
					engl[j].classList.add('_active');
					russ[j].classList.remove('_active');
				}
				e.preventDefault();
			})
		}
	}
}
//типо слайдеры
const aboutList = document.querySelector('.body-about__list');
const aboutItems = document.querySelectorAll('.body-about__item');
const scrolls = document.querySelectorAll('.scroll');
const aboutScroll = document.querySelector('.body-about__scroll');
let arr = [];
if (scrolls.length > 0) {
	//Делаем все блоки scroll одной высоты, чтобы слайдеры не меняли размер=============================================
	for (let i = 0; i < scrolls.length; i++) {
		scrolls[i].classList.remove('_none');
		arr[i] = scrolls[i].getBoundingClientRect().height;
		scrolls[i].classList.add('_none');
	}
	scrolls[0].classList.remove('_none');
	let maxHeight = Math.max.apply(Math, arr);
	scrolls.forEach(scroll => {
		scroll.style.height = `${maxHeight}px`
	});
	//==================================================================================================================
}
if (aboutList != null) {
	aboutList.addEventListener('click', (e) => {
		if (e.target.classList.contains('body-about__item')) {
			aboutItems.forEach(aboutItem => {
				aboutItem.classList.remove('_active');
			});
			e.target.classList.add('_active');
			scrolls.forEach(scroll => {
				scroll.classList.add('_none');
			});
			let dataValue = e.target.getAttribute('data-value');
			scrolls[dataValue].classList.remove('_none');
		}
	})
}
//рейтинг звезд, при нажатии добавляется класс и ко всем следующим(блок надо перевернуть флексом, чтобы добавлялось к "предыдущим"), при повторном наведении сбрасывается, при уходе возвращается к предыдущему выбору
const stars = document.querySelectorAll('.review__star');
let starActiv = new Array(5);
if (stars != null) {
	for (let i = 0; i < stars.length; i++) {
		stars[i].addEventListener('click', function (e) {
			stars[i].classList.add('_active');
			let d = Number(e.target.id);
			starActiv[Math.floor(d)] = Math.round((Number(`${Math.floor(d)}.5`) - d) * 10);
			for (let j = 1; j <= 5; j++) {
				let newD = d + Number(`0.${j}`);
				if (newD == `${Math.floor(newD)}.6`) break;
				let elem = document.getElementById(newD.toFixed(1));
				if (elem != null) {
					elem.classList.add('_active');
				}
			};
		});
		stars[i].addEventListener('mouseover', function (e) {
			stars[i].classList.remove('_active');
			let d = Number(e.target.id);
			for (let j = 1; j <= 5; j++) {
				let newD = Number(`${Math.floor(d)}.${j}`);
				document.getElementById(newD.toFixed(1)).classList.remove('_active');
			};
		});
		stars[i].addEventListener('mouseout', function (e) {
			let d = Number(e.target.id);
			for (let j = 0; j <= starActiv[Math.floor(d)]; j++) {
				let newD = Number(`${Math.floor(d)}.5`) - Number(`0.${j}`);
				document.getElementById(newD).classList.add('_active');
			}
		});
	};
};
//структурирование котиков
const structBtn = document.querySelector('.reviews__structurized_btn');
const structText = document.querySelector('.reviews__structurized_text');
const structCols = document.querySelectorAll('.reviews__column');
if (structBtn != null) {
	structBtn.addEventListener('click', function (e) {
		structBtn.classList.add('_active');
		structText.classList.add('_active');
		structCols.forEach(noStructCol => {
			noStructCol.classList.add('_active');
		});

		e.preventDefault();
	})
};
//Прокрутка к началу строници
const scrollToTop = document.querySelector('.footer__scroll');
if (scrollToTop != null) {
	scrollToTop.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	})
}
//Прокрутка пунктов меню
const advantageX = document.querySelector('.advantage_scroll');
const advantage = document.querySelector('.advantage');
const tariffsX = document.querySelector('.tariffs_scroll');
const tariffs = document.querySelector('.tariffs');
const reviewsX = document.querySelector('.reviews_scroll');
const reviews = document.querySelector('.reviews');
const feedbackX = document.querySelector('.feedback_scroll');
const feedback = document.querySelector('.feedback');
const questionsX = document.querySelector('.questions_scroll');
const questions = document.querySelector('.questions');
if (reviewsX != null) {
	reviewsX.addEventListener('click', () => scrollMy(reviews));
};
if (tariffsX != null) {
	tariffsX.addEventListener('click', () => scrollMy(tariffs));
};
if (advantageX != null) {
	advantageX.addEventListener('click', () => scrollMy(advantage));
};
if (feedbackX != null) {
	feedbackX.addEventListener('click', () => scrollMy(feedback));
};
if (questionsX != null) {
	questionsX.addEventListener('click', () => scrollMy(questions));
};
function scrollMy(block) {
	let getTop = block.getBoundingClientRect().top;
	window.scrollTo({
		top: getTop,
		left: 0,
		behavior: "smooth",
	});
};
//прокрутка к обратной связи к доп инфе по прайсу
const bodyAboutBtn = document.querySelector('.body-about__btn');
const rowTariffsBtns = document.querySelectorAll('.row-tariffs__btn');
const getPrice = document.querySelector('.get-price');
if (bodyAboutBtn != null) {
	bodyAboutBtn.addEventListener('click', (e) => {
		e.preventDefault();
		let getTop = feedback.getBoundingClientRect().top;
		let getTopDocument = getTop + window.scrollY;
		window.scrollTo({
			top: getTopDocument,
			left: 0,
			behavior: "smooth",
		});
	});
}
if (rowTariffsBtns.length > 0) {
	rowTariffsBtns.forEach(rowTariffsBtn => {
		rowTariffsBtn.addEventListener('click', (e) => {
			e.preventDefault();
			let getTop = getPrice.getBoundingClientRect().top;
			let getTopDocument = getTop + window.scrollY;
			window.scrollTo({
				top: getTopDocument,
				left: 0,
				behavior: "smooth",
			});
		});
	});
}
//анимация при скролле
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight; //высота объекта
			const animItemoffset = offset(animItem).top; //позиция объекта относительно верха
			const animStart = 4; //регулирует момент старта анимации, в данном случае при скролле 1/4 объекта

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollY > animItemoffset - animItemPoint) && scrollY < (animItemoffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) { //этот класс для того, чтобы не запускать анимацию повторно и не убирать класс _active
					animItem.classList.remove('_active');
				}
			}
		}
	}
	setTimeout(() => { //Если есть анимации на верхнем блоке, она покакжется без скролла через 0.3 сек
		animOnScroll();
	}, 300);
}
function offset(el) { //эта функция точно узнает местоположение объекта.Можно получить значение сверху и слева
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.scrollX || document.documentElement.scrollLeft,
		scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

//Popups
let popupLink = document.querySelectorAll('._popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding'); //Этот класс добавляется к фиксированным объектам
let unlock = true;
const timeout = 500;
if (popupLink.length > 0) {
	for (let index = 0; index < popupLink.length; index++) {
		const el = popupLink[index];
		el.addEventListener('click', function (e) {
			let popupName = el.getAttribute('href').replace('#', '');
			let curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}
let popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			if (menuBody.classList.contains('_active')) {
				popupClose(el.closest('.popup'), false);
			} else {
				popupClose(el.closest('.popup'));
			}
			e.preventDefault();
		})
	}
}
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		let activePopup = document.querySelector('.popup._active');
		if (activePopup) {
			popupClose(activePopup, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('_active');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				e.stopPropagation();
				if (menuBody.classList.contains('_active')) {
					popupClose(e.target.closest('.popup'), false);
				} else {
					popupClose(e.target.closest('.popup'));
				}
			}
		});
	}
}
function popupClose(item, doUnlock = true) {
	if (unlock) {
		item.classList.remove('_active');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock')

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock')
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		const popupActive = document.querySelector('.popup._active');
		if (menuBody.classList.contains('_active')) {
			popupClose(popupActive, false);
		} else {
			popupClose(popupActive);
		}
	}
});


function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();