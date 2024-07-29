"use strict";

const navLinkEl = document.querySelectorAll(".side-nav__item");

const toggleActive = (clickedItem) => {
  navLinkEl.forEach((item) => item.classList.remove("side-nav__item--active"));

  clickedItem.classList.add("side-nav__item--active");
};

navLinkEl.forEach((n) => n.addEventListener("click", () => toggleActive(n)));
