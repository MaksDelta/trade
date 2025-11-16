document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.getElementById("hamburger");
	const fullscreenMenu = document.getElementById("fullscreenMenu");
	const closeBtn = document.getElementById("closeBtn");

	hamburger.addEventListener("click", () => {
		fullscreenMenu.classList.add("active");
		closeBtn.classList.add("active");
	});

	closeBtn.addEventListener("click", () => {
		fullscreenMenu.classList.remove("active");
		closeBtn.classList.remove("active");
	});
});

class TradeCard extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <div class="card">
        <h3 class="pair">${this.getAttribute("pair")}</h3>
        <p class="time">${this.getAttribute("time")}</p>
        <p class="status">${this.getAttribute("status")}</p>
        <div class="profit-block">
          <p class="profit">${this.getAttribute("profit")}</p>
          <img src="/Vector 15.svg" alt="profit" class="profit-icon" />
        </div>
        <div class="profit-footer">
          <p class="goal">${this.getAttribute("goal")}</p>
          <p class="date">${this.getAttribute("date")}</p>
        </div>
      </div>
    `;
	}
}

customElements.define("trade-card", TradeCard);

const buttons = document.querySelectorAll(".switch-buttons button");
const card = document.querySelector(".tariff-card");
const slider = document.querySelector(".switch-buttons .slider");

function getMonthWord(n) {
	if (n === 1) return "місяць";
	if (n > 1 && n < 5) return "місяці";
	return "місяців";
}

function createTariffCard(type) {
	let title = "Standart";
	let basePrice = 234;
	let maxDiscount = 35;
	let features = [
		"Ручний трейдинг",
		"Автоматичне або напівавтоматичне копіювання угод",
		"Особистий кабінет зі статистикою",
		"Середньострокові угоди з рівнями набору портфеля",
	];

	if (type === "futures") {
		title = "Futures";
		basePrice = 500;
		maxDiscount = 25;
		features = [
			"Автозакриття угод за сигналами",
			"Розширена аналітика та статистика портфеля трейдера",
			"Індивідуальні торгові стратегії",
			"Миттєві повідомлення про важливі події на ринку",
		];
	}

	card.innerHTML = `
	<div>
    <h3>${title}</h3>
    <ul class="features">
      ${features.map((f) => `<li>${f}</li>`).join("")}
    </ul>
		</div>

		<div>
    <div class="price-block">
      <div class="price-left">
        <p class="price">$${basePrice}</p>
        <span class="discount">-${Math.round(maxDiscount / 12)}%</span>
      </div>

      <div class="month-selector">
  <button class="selected-month">
    1 місяць
    <span class="triangle">&#9662;</span>
  </button>
<ul class="month-list">
  ${[...Array(12)]
		.map(
			(_, i) =>
				`<li data-month="${i + 1}" data-discount="${Math.round(
					(maxDiscount * (i + 1)) / 12
				)}">${i + 1} ${getMonthWord(i + 1)}</li>`
		)
		.join("")}
</ul>
</div>

    </div>

      <button class="trial-btn">
    <span class="trial-main">Попробувати</span>
    <span class="trial-sub">5 днів безкоштовно</span>
  </button>
	</div>
  `;

	const monthSelector = card.querySelector(".month-selector");
	const selectedBtn = monthSelector.querySelector(".selected-month");
	const monthList = monthSelector.querySelector(".month-list");
	const discountEl = card.querySelector(".discount");

	selectedBtn.addEventListener("click", () => {
		monthList.style.display =
			monthList.style.display === "block" ? "none" : "block";
	});

	monthList.querySelectorAll("li").forEach((li) => {
		li.addEventListener("click", () => {
			const month = li.dataset.month;
			const discount = li.dataset.discount;
			selectedBtn.querySelector(".triangle");
			selectedBtn.childNodes[0].textContent = `${month} ${getMonthWord(
				month
			)} `;
			discountEl.textContent = `-${discount}%`;
			monthList.style.display = "none";
		});
	});

	document.addEventListener("click", (e) => {
		if (!monthSelector.contains(e.target)) {
			monthList.style.display = "none";
		}
	});
}

buttons.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		buttons.forEach((b) => b.classList.remove("active"));
		btn.classList.add("active");

		slider.style.left = `${index * 50}%`;

		createTariffCard(btn.dataset.type);
	});
});

document.addEventListener("DOMContentLoaded", () => {
	createTariffCard("spot");
	createVipCard();
});

function createVipCard() {
	const card = document.getElementById("vipCard");

	const title = "VIP";
	const basePrice = 585;
	const maxDiscount = 35;

	card.innerHTML = `
	<div>
    <h3>${title}</h3>

    <ul class="features">
      <li>Ручний трейдинг</li>
      <li>Автоматичне або напівавтоматичне копіювання угод</li>
      <li>Особистий кабінет зі статистикою</li>
      <li>Короткострокові, середньострокові та інвест угоди</li>
      <li>Доступ до Vip чату з командою</li>
      <li>Наш авторський курс з трейдингу</li>
    </ul>
		</div>

		<div>
    <div class="price-block">
      <div class="price-left">
        <p class="price">$${basePrice}</p>
        <span class="discount">-${maxDiscount}%</span>
      </div>

      <div class="month-selector">
        <button class="selected-month">
          12 місяців
          <span class="triangle">&#9662;</span>
        </button>

        <ul class="month-list">
          ${[...Array(12)]
						.map(
							(_, i) =>
								`<li data-month="${i + 1}" data-discount="${Math.round(
									(maxDiscount * (i + 1)) / 12
								)}">${i + 1} ${getMonthWord(i + 1)}</li>`
						)
						.join("")}
        </ul>
      </div>
    </div>

    <button class="trial-btn">
      <span class="trial-main">Попробувати</span>
      <span class="trial-sub">5 днів безкоштовно</span>
    </button>
		</div>
  `;

	const monthSelector = card.querySelector(".month-selector");
	const selectedBtn = monthSelector.querySelector(".selected-month");
	const monthList = monthSelector.querySelector(".month-list");
	const discountEl = card.querySelector(".discount");

	selectedBtn.addEventListener("click", () => {
		monthList.style.display =
			monthList.style.display === "block" ? "none" : "block";
	});

	monthList.querySelectorAll("li").forEach((li) => {
		li.addEventListener("click", () => {
			const month = li.dataset.month;
			const discount = li.dataset.discount;

			selectedBtn.innerHTML = `
        ${month} ${getMonthWord(month)}
        <span class="triangle">&#9662;</span>
      `;

			discountEl.textContent = `-${discount}%`;
			monthList.style.display = "none";
		});
	});

	document.addEventListener("click", (e) => {
		if (!monthSelector.contains(e.target)) {
			monthList.style.display = "none";
		}
	});
}

document.querySelectorAll(".faq-header").forEach((header) => {
	header.addEventListener("click", () => {
		const item = header.parentElement;
		item.classList.toggle("active");
	});
});
