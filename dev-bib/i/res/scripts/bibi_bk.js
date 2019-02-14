SZSR = {}, SZSR.forEach = function (e, t) {
		return Array.prototype.forEach.call(e, t)
	}, SZSR.Book = {
		Region: "",
		Category: "",
		WorkID: "",
		Volume: "",
		Path: {
			WorkRoot: "",
			WorkPortal: ""
		},
		define: function () {
			var e = document.body.getAttribute("data-bibi-book");
			"string" == typeof e && (e = e.split("/"), e.length < 4 || (this.Region = e[0], this.Category = e[1], this.WorkID = e[2], this.Volume = 1 * e[3].replace(/^0*/, ""), this.Path.WorkRoot = "/" + this.Region + "/" + this.Category + "/" + this.WorkID, this.Path.WorkPortal = SZSR["4pComics"] ? this.Path.WorkRoot : "/" + this.Category + "/" + this.WorkID))
		}
	}, SZSR.applyMeta = function (e) {
		try {
			SZSR.Book.WorkMeta = JSON.parse(e.responseText)
		} catch (t) {
			return !1
		}
		if (SZSR.Book.WorkMeta["sai-zen-sen"] && "string" == typeof SZSR.Book.WorkMeta["sai-zen-sen"].index && SZSR.Book.WorkMeta["sai-zen-sen"].index.length > 1 && SZSR.Book.WorkMeta["sai-zen-sen"].index.length >= SZSR.Book.Volume && 1 == SZSR.Book.WorkMeta["sai-zen-sen"].index[SZSR.Book.Volume - 1]) {
			for (var n = [SZSR.Book.WorkMeta["sai-zen-sen"].index], a = n[0].length, o = 1; o <= a; o++) n[o] = "1" == n[0][o - 1];
			SZSR.Book.WorkMeta["sai-zen-sen"].index = n;
			for (var r = SZSR.Book.Volume, i = 1, s = SZSR.Book.WorkMeta["sai-zen-sen"].index.length - 1, d = r > i ? r - 1 : null, S = r < s ? r + 1 : null, c = null, o = i; o <= s; o++)
				if (SZSR.Book.WorkMeta["sai-zen-sen"].index[o]) {
					c = o;
					break
				}
			for (var l = null, o = s; o >= i; o--)
				if (SZSR.Book.WorkMeta["sai-zen-sen"].index[o]) {
					l = o;
					break
				}
			var p = null;
			if (d)
				for (var o = d; o >= c; o--)
					if (SZSR.Book.WorkMeta["sai-zen-sen"].index[o]) {
						p = o;
						break
					}
			var u = null;
			if (S)
				for (var o = S; o <= l; o++)
					if (SZSR.Book.WorkMeta["sai-zen-sen"].index[o]) {
						u = o;
						break
					}
			var h = function (e, t) {
				var n = SZSR.Book.Path.WorkRoot + "/" + sML.String.pad(e, 0, 2) + (SZSR["4pComics"] ? ".html" + ("#en" == location.hash ? "#en" : "") : "/01.html");
				return "<li>" + (e && e != r ? '<a href="' + n + '">' : "<a>") + t + "</a></li>"
			};
			SZSR.Extra.Nav = SZSR.Extra.querySelector("nav"), SZSR.Extra.Nav.Volumes = SZSR.Extra.Nav.insertBefore(sML.create("ul", {
				className: "volumes",
				innerHTML: [h(c, "第" + c + "回"), h(p, p && p != d ? "第" + p + "回" : "前の回"), h(u, u && u != S ? "第" + u + "回" : "次の回"), h(l, "最新回")].join("")
			}), SZSR.Extra.Nav.firstElementChild)
		}
		if (SZSR.Extra.querySelector("nav > ul") || (SZSR.Extra.querySelector("nav").innerHTML = ""), SZSR.Book.WorkMeta.amazon && "string" == typeof SZSR.Book.WorkMeta.amazon.title && "string" == typeof SZSR.Book.WorkMeta.amazon.uri && "string" == typeof SZSR.Book.WorkMeta.amazon.cover) {
			var R = SZSR.Book.WorkMeta.amazon.title,
				g = SZSR.Book.WorkMeta.amazon.uri,
				m = SZSR.Book.WorkMeta.amazon.cover;
			SZSR.Extra.Aside = SZSR.Extra.appendChild(sML.create("aside")), SZSR.Extra.Aside.innerHTML = ['<div class="figgroup">', '<figure><a href="' + g + '" title="『' + R + '』- Amazon で販売中">', '<span class="figbody"><img alt="" src="' + m + '" /></span>', "<figcaption>" + R + "</figcaption>", "</a></figure>", '<p><a href="' + g + '"><img alt="『' + R + '』- Amazon で販売中" src="/reader/res/images/amazon.png" /></a></p>', "</div>"].join("")
		}
	}, SZSR.GA = {}, SZSR.GA.getElementSelector = function (e) {
		return e.tagName.toLowerCase() + (e.className ? "." + e.className.split(" ")[0] : "") + (e.id ? "#" + e.id : "")
	}, SZSR.GA.getElementPath = function (e) {
		for (var t = ""; e && e != document.body;) t = SZSR.GA.getElementSelector(e) + " > " + t, e = e.parentNode;
		return t.replace(/ > $/, "")
	}, SZSR.GA.sendEvent = function (e, t, n, a) {
		t = "SaiZenSen: " + t, n = t + ": " + n, a = SZSR.GA.getElementPath(e) + (a ? " - " + a : ""), ga("send", {
			hitType: "event",
			eventCategory: t,
			eventAction: n,
			eventLabel: a,
			eventValue: 1
		})
	}, SZSR.GA.init = function () {
		SZSR.GA.OriginRE = new RegExp("^" + location.protocol + "//" + location.host + "/")
	}, SZSR.GA.initAnchors = function (e) {
		for (var t = (e ? e : document.body).getElementsByTagName("a"), n = 0, a = t.length; n < a; n++) {
			if (A = t[n], A.SZSR_GA) return;
			A.SZSR_GA = "Processed", SZSR.GA.OriginRE.test(A.href) || (A.target = "_blank", /^https?:\/\/(twitter\.com\/intent\/tweet\?|www\.facebook\.com\/share.php\?|b\.hatena\.ne\.jp\/entry\/|line\.naver\.jp\/R\/msg\/text\/\?)/.test(A.href) ? A.addEventListener("click", function () {
				SZSR.GA.sendEvent(this, "Social: Share to", this.href.replace(/^https?:\/\//, "").split("/")[0])
			}) : /^https?:\/\/(twitter\.com\/)/.test(A.href) ? A.addEventListener("click", function () {
				SZSR.GA.sendEvent(this, "Social: Follow on", this.href.replace(/^https?:\/\//, ""))
			}) : A.addEventListener("click", function () {
				SZSR.GA.sendEvent(this, "Link: Outgo to", this.href.replace(/^https?:\/\//, ""))
			}))
		}
	},
	function (e, t, n, a, o, r, i) {
		e.GoogleAnalyticsObject = o, e[o] = e[o] || function () {
			(e[o].q = e[o].q || []).push(arguments)
		}, e[o].l = 1 * new Date, r = t.createElement(n), i = t.getElementsByTagName(n)[0], r.async = 1, r.src = a, i.parentNode.insertBefore(r, i)
	}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-17306372-" + ("sai-zen-sen.jp" == location.host ? "2" : "15"), "auto", {
		allowLinker: !0
	}), ga("require", "linkid", "linkid.js"), ga("send", "pageview"), document.addEventListener("DOMContentLoaded", function () {
		SZSR.GA.init()
	}), document.addEventListener("DOMContentLoaded", function () {
		SZSR.GA.initAnchors()
	}), window.addEventListener("load", function () {
		SZSR.GA.initAnchors()
	}), SZSR.version = "2.1.0", SZSR.extendAnchor = function (e) {
		return SZSR.extendAnchor.cleanHref(e), SZSR.extendAnchor.setTargetFrame(e), SZSR.extendAnchor.setEventTracking(e), SZSR.extendAnchor.setSmoothScrolling(e), e
	}, SZSR.extendAnchor.cleanHref = function (e) {
		var t = e.getAttribute("href");
		return t && "#" != t || e.removeAttribute("href"), e
	}, SZSR.extendAnchor.setTargetFrame = function (e) {
		var t = e.getAttribute("href");
		return /^https?:\/\//.test(t) && (e.target = t.replace(/^https?:\/\/([^\/:]+).*$/, "$1")), e
	}, SZSR.extendAnchor.setEventTracking = function (e) {
		e.getAttribute("href");
		return e.addEventListener("click", function (e) {}), e
	}, SZSR.extendAnchor.setSmoothScrolling = function (e) {
		var t = e.getAttribute("href");
		return "./" == t ? e.getTargetElement = function () {
			return document.body
		} : /^#/.test(t) ? e.getTargetElement = function () {
			return document.querySelector(t)
		} : e.hash && e.protocol + "//" + e.host == location.origin && e.pathname == location.pathname && e.search == location.search && (e.getTargetElement = function () {
			return document.querySelector(e.hash)
		}), e.getTargetElement && e.addEventListener("click", function (t) {
			t.preventDefault();
			var n = e.getTargetElement();
			return !!n && (sML.scrollTo({
				Frame: window,
				Y: sML.Coord.getElementCoord(n).Y
			}, {
				Duration: 640,
				Easing: "easeOutExpo",
				callback: function () {}
			}), !1)
		}), e
	}, SZSR.extendAnchors = function () {
		SZSR.forEach(O.Body.getElementsByTagName("a"), SZSR.extendAnchor)
	}, SZSR.setDeviceInteraction = function (e) {
		e = e ? e : "a[href], input[type='button'], input[type='submit']", SZSR.IsMobile ? SZSR.forEach(O.Body.querySelectorAll(e), function (e) {
			e.addEventListener(O.pointerdown, function () {
				sML.addClass(this, "active")
			}), e.addEventListener(O.pointerup, function () {
				sML.removeClass(this, "active")
			})
		}) : SZSR.forEach(O.Body.querySelectorAll(e), function (e) {
			e.addEventListener(O.pointerover, function () {
				sML.addClass(this, "hover")
			}), e.addEventListener(O.pointerdown, function () {
				sML.addClass(this, "active")
			}), e.addEventListener(O.pointerup, function () {
				sML.removeClass(this, "active")
			}), e.addEventListener(O.pointerout, function () {
				sML.removeClass(this, "hover"), sML.removeClass(this, "active")
			})
		})
	}, E.add("bibi:opened", function () {
		SZSR.extendAnchors(), SZSR.setDeviceInteraction()
	}), Bibi.WelcomeMessage = "SaiZenSen Reader v" + SZSR.version + " for Comics - powered by BiB/i v" + Bibi.version + " - https://bibi.epub.link", B.checkContainer = function () {
		return new Promise(function (e) {
			B.Unzipped = !0, O.log("SaiZenSen Book: " + B.Path + ".html", "-*"), e()
		})
	}, L.loadContainer = function () {
		L.loadPackageDocument()
	}, L.loadPackageDocument = function () {
		SZSR.Book.define(), B.Package.Metadata["rendition:layout"] = "pre-paginated", B.Package.Metadata["rendition:orientation"] = "portrait", B.Package.Metadata["rendition:spread"] = "landscape", B.Package.Spine["page-progression-direction"] = "rtl", B.WritingMode = B.PPD = B.Package.Spine["page-progression-direction"], SZSR.forEach(R.Main.Book.querySelectorAll(".item"), function (e, t) {
			if (e.querySelector(".extra")) {
				var n = "extra",
					a = "",
					o = "center";
				SZSR.ExtraInnerHTML = e.querySelector(".extra").innerHTML
			} else {
				var r = 1 * e.id.replace(/^item-/, ""),
					n = e.id;
				if (SZSR["4pComics"]) var a = "",
					o = "marine-yumi" != SZSR.Book.WorkID || t ? r % 2 ? "right" : "left" : "center";
				else var a = "01.res/" + sML.String.pad(r, 0, 3) + ".png",
					o = r % 2 ? "left" : "right"
			}
			B.Package.Manifest.items[n] = {
				href: a
			}, B.Package.Spine.itemrefs.push({
				idref: n,
				linear: "yes",
				"page-spread": o,
				"rendition:layout": "pre-paginated",
				"rendition:orientation": "portrait",
				"rendition:page-spread": o,
				"rendition:spread": "landscape",
				viewport: {
					height: 850,
					width: 600
				}
			})
		}), S.update(), E.dispatch("bibi:loaded-package-document");
		var e = R.Main.Book.querySelector("header");
		if (e) var t = e.innerHTML;
		R.Main.Book.innerHTML = "", t && (SZSR.Header = R.Main.Book.appendChild(sML.create("header", {
			innerHTML: t
		})), SZSR.Menu.Cloud.innerHTML = '<a href="' + SZSR.Book.Path.WorkPortal + '/">' + SZSR.Header.querySelector("h1").innerHTML + "</a>"), L.prepareSpine(function (e) {
			return document.createElement("div")
		}), E.dispatch("bibi:prepared"), L.loadItemsInSpreads()
	}, L.loadItemsInSpreads = function () {
		SZSR.LoadingContentDescription = R.Items.length - 1 + " Items in " + (R.Spreads.length - 1) + " Spreads + 1 Extra Item in 1 Spread", O.stamp("Load Items in Spreads"), O.log("Loading " + SZSR.LoadingContentDescription + "...", "*:"), R.resetStage(), R.Main.Book.style.opacity = 0, SZSR.LoadedLowSources = 0, SZSR.LoadedImages = 0, SZSR.forEach(R.Items, function (e, t) {
			"extra" != e.ItemRef.idref ? L.loadItem(e) : SZSR.loadExtraItem(e), e.HTML = e.Body = e.Content, e.id = "extra" != e.ItemRef.idref ? e.ItemRef.idref : "item-" + sML.String.pad(1 * R.Items[t - 1].ItemRef.idref.replace(/^item-/, "") + 1, 0, 3), e.Content.id = e.id.replace(/^item-/, "p-"), e.ItemBox.appendChild(e), e.contentDocument = {}, e.contentDocument.addEventListener = e.contentDocument.removeEventListener = function () {};
			var n = e.ItemBox.appendChild(sML.create("span", {
				className: "page"
			}));
			n.Item = e, n.Spread = e.Spread, n.PageIndex = R.Pages.length, n.PageIndexInSpread = e.Spread.Pages.length, n.PageIndexInItem = e.Pages.length, R.Pages.push(n), e.Spread.Pages.push(n), e.Pages.push(n)
		}), SZSR.SingleLeftItems = R.Main.Book.querySelectorAll(".item-box:first-child.page-spread-left > .item") || [], SZSR.SingleRightItems = R.Main.Book.querySelectorAll(".item-box:last-child.page-spread-right > .item") || [], SZSR.SingleCenterItems = R.Main.Book.querySelectorAll(".item-box:first-child:last-child.page-spread-center > .item") || [], SZSR.forEach(SZSR.SingleLeftItems, function (e) {
			sML.addClass(e.Spread, "single-left-spread")
		}), SZSR.forEach(SZSR.SingleRightItems, function (e) {
			sML.addClass(e.Spread, "single-right-spread")
		}), SZSR.forEach(SZSR.SingleCenterItems, function (e) {
			sML.addClass(e.Spread, "single-center-spread")
		})
	}, L.loadItem = function (e) {
		e.ImageSource = function () {
			return SZSR["4pComics"] ? "#en" == location.hash && SZSR["4pComics"].Sources.en && SZSR["4pComics"].Sources.en[e.ItemIndex] ? SZSR["4pComics"].Sources.en[e.ItemIndex] : SZSR["4pComics"].Sources.ja[e.ItemIndex] : B.Path + B.PathDelimiter + e.Path
		}(), e.Content = e.appendChild(sML.create("img", {
			className: "item-content item-image",
			alt: "",
			onload: function () {
				L.loadItem.onLoadPlaceholder(e)
			}
		})), e.Content.src = "/reader/res/images/spacer.png", e.Content.addEventListener("touchstart", function (e) {
			I.Swiper && e.touches.length >= 2 && I.Swiper.close()
		}), e.Content.addEventListener("touchend", function (e) {
			I.Swiper && I.Swiper.open()
		})
	}, L.loadItem.onLoadPlaceholder = function (e) {
		SZSR.LoadedLowSources++, SZSR.LoadedLowSources >= R.Items.length - 1 && (O.log(SZSR.LoadingContentDescription, "-*"), SZSR.layOut()), 0 == e.ItemIndex && L.loadItem.loadImage(e)
	}, L.loadItem.loadImage = function (e) {
		sML.create("img", {
			onload: function () {
				L.loadItem.onLoadImage(e)
			}
		}).src = e.ImageSource
	}, L.loadItem.onLoadImage = function (e) {
		SZSR.LoadedImages++, e.Content.onload = function () {}, e.Content.src = e.ImageSource, SZSR.layOut(), e.ItemIndex + 1 < R.Items.length - 1 && setTimeout(function () {
			L.loadItem.loadImage(R.Items[e.ItemIndex + 1])
		}, 10), 0 == e.ItemIndex && setTimeout(function () {
			R.Main.Book.style.opacity = "", L.onLoadItemsInSpreads()
		}, O.Mobile ? 99 : 1)
	}, SZSR.loadExtraItem = function (e) {
		e.Content = e.appendChild(sML.create("div", {
			className: "item-content extra-content",
			innerHTML: SZSR.ExtraInnerHTML,
			Item: e
		})), sML.addClass(e.Spread.SpreadBox, "extra-spread-box"), delete SZSR.ExtraInnerHTML, SZSR.Extra = e.Content, O.download("/" + (SZSR["4pComics"] ? SZSR.Book.Region + "/" : "") + SZSR.Book.Category + "/" + SZSR.Book.WorkID + "/meta.json").then(function (e) {
			e && SZSR.applyMeta(e)
		})
	}, L.onLoadItemsInSpreads = function () {
		O.stamp("Items in Spreads Loaded"), O.log(SZSR.LoadingContentDescription + " Loaded.", "/*"), delete SZSR.LoadingContentDescription, E.dispatch("bibi:loaded-items"), E.dispatch("bibi:loaded-spreads"), E.dispatch("bibi:loaded-items-in-spreads"), SZSR.ScrollCoordsNeedToBeTreated = SZSR.detectThatScrollCoordsNeedToBeTreated(), L.onLoadBook()
	}, SZSR.detectThatScrollCoordsNeedToBeTreated = function () {
		var e = R.Main.scrollLeft;
		R.Main.scrollLeft = 10;
		var t = !sML.UA.InternetExplorer && 10 == R.Main.scrollLeft;
		return R.Main.scrollLeft = e, t
	}, E.add("bibi:opened", function () {
		E.dispatch("bibi:commands:focus-on", {
			Destination: "head"
		})
	}), SZSR.MainOpacityStyleIndex = sML.appendStyleRule("main", "opacity: 0;"), E.add("bibi:opened", function () {
		sML.deleteStyleRule(SZSR.MainOpacityStyleIndex)
	}), R.initializeElements = function () {
		R.Main = O.Body.querySelector("main"), R.Main.Book = O.Body.querySelector(".book"), R.Sub = O.Body.insertBefore(sML.create("div"), R.Main.nextSibling)
	}, R.getFrameState = function () {
		var e = sML.Coord.getScrollCoord(R.Main),
			t = sML.Coord.getClientSize(R.Main);
		return SZSR.ScrollCoordsNeedToBeTreated && (e.X = e.X + t.W - R.Main.scrollWidth), {
			Coord: e,
			Size: t
		}
	}, R.focusOn.getScrollTarget = function (e) {
		var t = {
				Frame: R.Main,
				X: 0,
				Y: 0
			},
			n = (sML.Coord.getScrollCoord(R.Main), sML.Coord.getClientSize(R.Main));
		return SZSR.ScrollCoordsNeedToBeTreated && (e = e - n.W + R.Main.scrollWidth), t[S.AXIS.L] = e * R.Scale, t
	}, SZSR.layOut = function () {
		SZSR.forEach(SZSR.SingleLeftItems, function (e) {
			e.Spread.style.paddingRight = e.offsetWidth + "px"
		}), SZSR.forEach(SZSR.SingleRightItems, function (e) {
			e.Spread.style.paddingLeft = e.offsetWidth + "px"
		}), SZSR.forEach(R.Spreads, function (e, t) {
			var n = 90;
			"portrait" == R.Orientation ? e.style.margin = "0 0 0 " + Math.max(n, (window.innerWidth - e.offsetWidth / 2) / 2) + "px" : e.style.margin = "0 " + Math.max(n, (window.innerWidth - e.offsetWidth) / 2) + "px"
		}), R.Current.Page && R.focusOn({
			Destination: R.Current.Page,
			Duration: 0
		})
	}, E.add("bibi:changed-orientation", SZSR.layOut), R.layOut = function () {
		window.removeEventListener(O.resize, R.onresize), R.Main.removeEventListener("scroll", R.onscroll), R.getCurrent();
		var e = SZSR.PreviousPage ? SZSR.PreviousPage : R.Current.Page;
		SZSR.PreviousPage = void 0, R.resetStage(), e && E.dispatch("bibi:commands:focus-on", {
			Destination: {
				SpreadIndex: e.Spread.SpreadIndex,
				PageProgressInSpread: e.PageIndexInSpread / e.Spread.Pages.length
			},
			Duration: 0
		}), SZSR.layOut(), window.addEventListener(O.resize, R.onresize), R.Main.addEventListener("scroll", R.onscroll), E.dispatch("bibi:laid-out")
	}, E.add("bibi:resizes", function () {
		SZSR.PreviousPage || (SZSR.PreviousPage = R.getCurrentPages()[0])
	}), I.initialize = function () {
		E.bind("bibi:readied", function () {
			SZSR.createMenu(), SZSR.createSharePanel()
		}), E.bind("bibi:prepared", function () {
			I.createSlider(), I.createArrows(), I.createKeyListener(), I.createSwiper()
		})
	}, SZSR.createMenu = function () {
		SZSR.Menu = {}, I.setToggleAction(SZSR.Menu, {
			onopened: function () {
				sML.addClass(O.HTML, "menu-opened"), E.dispatch("bibi:opened-menu")
			},
			onclosed: function () {
				sML.removeClass(O.HTML, "menu-opened"), E.dispatch("bibi:closed-menu")
			}
		}), E.add("bibi:commands:open-menu", function () {
			SZSR.Menu.open()
		}), E.add("bibi:commands:close-menu", function () {
			SZSR.Menu.close()
		}), E.add("bibi:commands:toggle-menu", function () {
			SZSR.Menu.toggle()
		}), E.add("bibi:tapped", function (e) {
			if (L.Opened) {
				var t = O.getBibiEvent(e);
				if (t.Coord.Y > window.innerHeight - O.Scrollbars.Height) return !1;
				if (t.Target.tagName) {
					if (O.isAnchorContent(t.Target)) return !1;
					if (/bibi-slider|szsr-/.test(t.Target.className + t.Target.id)) return !1
				}
				return "center" == t.Division.X && E.dispatch("bibi:commands:toggle-menu")
			}
		}), SZSR.Menu.Heaven = O.Body.appendChild(sML.create("div", {
			id: "szsr-heaven",
			innerHTML: '<a href="/"><img alt="最前線" src="/reader/res/images/sai-zen-sen.png" /></a>'
		})), SZSR.Menu.Earth = O.Body.appendChild(sML.create("div", {
			id: "szsr-earth"
		})), SZSR.Menu.Share = SZSR.Menu.Earth.appendChild(sML.create("span", {
			id: "szsr-menu_share",
			innerHTML: "<span>シェア</span>"
		})), I.setFeedback(SZSR.Menu.Share).addTapEventListener("tap", function () {
			E.dispatch("bibi:commands:toggle-share-panel")
		}), SZSR.Menu.Close = SZSR.Menu.Earth.appendChild(sML.create("span", {
			id: "szsr-menu_close",
			innerHTML: "<span>閉じる</span>"
		})), I.setFeedback(SZSR.Menu.Close).addTapEventListener("tap", function () {
			E.dispatch("bibi:commands:close-menu")
		}), SZSR.Menu.Cloud = O.Body.appendChild(sML.create("div", {
			id: "szsr-cloud"
		})), SZSR.Menu.Ocean = O.Body.appendChild(sML.create("div", {
			id: "szsr-ocean"
		})), I.observeTap(SZSR.Menu.Ocean, {
			StopPropagation: !0,
			PreventDefault: !0
		}).addTapEventListener("tap", function () {
			E.dispatch("bibi:commands:close-menu")
		})
	}, SZSR.createSharePanel = function () {
		SZSR.SharePanel = O.Body.appendChild(sML.create("div", {
			id: "szsr-share-panel",
			innerHTML: "<p><strong>この作品をみんなにシェアしよう！</strong></p>"
		})), I.setToggleAction(SZSR.SharePanel, {
			onopened: function () {
				sML.addClass(O.HTML, "share-panel-opened"), E.dispatch("bibi:opened-share-panel")
			},
			onclosed: function () {
				sML.removeClass(O.HTML, "share-panel-opened"), E.dispatch("bibi:closed-share-panel")
			}
		}), E.add("bibi:commands:open-share-panel", function () {
			SZSR.SharePanel.open()
		}), E.add("bibi:commands:close-share-panel", function () {
			SZSR.SharePanel.close()
		}), E.add("bibi:commands:toggle-share-panel", function () {
			SZSR.SharePanel.toggle()
		}), E.add("bibi:closed-menu", function () {
			E.dispatch("bibi:commands:close-share-panel")
		}), SZSR.SharePanel.addEventListener(O.pointerdown, function (e) {
			e.stopPropagation()
		}), SZSR.SharePanel.ShareButtons = SZSR.SharePanel.appendChild(sML.create("p", {
			id: "szsr-share-panel_buttons"
		})), SZSR.SharePanel.ShareButtons.getShareURI = function (e, t) {
			var n = "",
				a = "";
			switch (e) {
				case "P":
					n = U["parent-title"], a = U["parent-uri"];
					break;
				case "B":
					n = document.title, a = O.ReadiedURL
			}
			var o = encodeURIComponent(a.replace(/^https?:\/\/[^\/]+/, "https://sai-zen-sen.jp"));
			switch (t) {
				case "T":
					return "https://twitter.com/intent/tweet?url=" + o + "&amp;text=" + encodeURIComponent(n) + "&amp;hashtags=" + encodeURIComponent("最前線");
				case "F":
					return "https://www.facebook.com/sharer.php?u=" + o;
				case "H":
					return "https://b.hatena.ne.jp/entry/" + o;
				case "G":
					return "https://plus.google.com/share?url=" + o
			}
			return ""
		}, SZSR.SharePanel.ShareButtons.innerHTML = ['<a href="' + SZSR.SharePanel.ShareButtons.getShareURI("B", "T") + '"><img alt="Twitter にツイートする" src="/reader/res/images/share-panel_twitter.png" /></a>', '<a href="' + SZSR.SharePanel.ShareButtons.getShareURI("B", "F") + '"><img alt="Facebook にシェアする" src="/reader/res/images/share-panel_facebook.png" /></a>', '<a href="' + SZSR.SharePanel.ShareButtons.getShareURI("B", "H") + '"><img alt="はてなブックマークにブックマークする" src="/reader/res/images/share-panel_hatena-bookmark.png" /></a>'].join(""), SZSR.SharePanel.Close = SZSR.SharePanel.appendChild(sML.create("span", {
			id: "szsr-share-panel_close",
			innerHTML: "<span>閉じる</span>"
		})), I.setFeedback(SZSR.SharePanel.Close).addTapEventListener("tap", function () {
			E.dispatch("bibi:commands:close-share-panel")
		}), E.add("bibi:opened", function () {
			O.Head.appendChild(sML.create("script", {
				async: "async",
				src: "//platform.twitter.com/widgets.js"
			}))
		})
	}, E.add("bibi:created-slider", function () {
		I.Slider.ProgressColor = I.Slider.appendChild(sML.create("div", {
			id: "szsr-progress-color"
		})), I.Slider.progress = function () {
			if (R.Current.Page) {
				var e = I.Slider.offsetWidth * ((R.Current.Page.PageIndex + 1) / R.Pages.length);
				I.Slider.Current.style.right = e - I.Slider.Current.offsetWidth / 2 + "px", I.Slider.ProgressColor.style.width = e + "px"
			}
		}, SZSR.Menu.Earth.appendChild(I.Slider), I.Slider.open(), I.Slider.open = I.Slider.close = function () {
			return !1
		}
	}), E.add("bibi:created-arrows", function () {
		[I.Arrows.Back, I.Arrows.Forward].forEach(function (e) {
			document.body.appendChild(e)
		})
	}), E.add("bibi:opened", function () {
		I.Swiper.open()
	});
